import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();


//create a ratelimiter
const rateLimit = new Ratelimit({
    redis:Redis.fromEnv(),
    limiter:Ratelimit.fixedWindow(10,"20 s")  //100 req per minute
});

export default rateLimit;