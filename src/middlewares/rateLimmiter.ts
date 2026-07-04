import type { NextFunction, Request, Response } from "express";
import { Redis } from "ioredis";

import {config} from '../library/config.js'

const MAX_LIMIT = 5;
const REFRESH_TIME = 30; //in seconds

export default class RateLimiter {
    private client: Redis;


    constructor() {
        this.client = new Redis({
            host: config.redis.host,
            port: config.redis.port,
            username: config.redis.username,
            password: config.redis.password,
        });
    }


    connect() {
        this.client.connect((data, newData) => {
            console.log("After connection", {
                data,
                newData
            })
        })
    }

    async rateLimit(req: Request, res: Response, next: NextFunction) {
        try {
            const ip = req.ip;
            const key = `rate_limit:${ip}`;

            let currentCount = await this.client.incr(key);

            if (currentCount === 1) {
                this.client.expire(key, REFRESH_TIME)
            }

            if (currentCount > MAX_LIMIT) {
                return res.status(429).json({
                    message: "TOO MANY REQUEST"
                })
            }

            
            next();
        }
        catch (err) {
            next();
        }
    }


    async slidingRateLimit(req: Request, res: Response, next: NextFunction){
        try {

            const ip = req.ip;
            const currentTime = Date.now();

            const key = `sliding-limit:${ip}`

            const timeStamps = await this.client.lrange(key,0,-1);
            const currentWindow = timeStamps.filter(t=> (currentTime - Number(t)) <= REFRESH_TIME)

            if (currentWindow.length > MAX_LIMIT){
                return res.status(429).json({
                    message: "TOO MANY REQUEST"
                })
            }

            await this.client.lpush(key,currentTime);
            await this.client.ltrim(key, 0, MAX_LIMIT -1)
            
            next();




        } catch(err){
            next()
        }
    }

}