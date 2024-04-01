const zod = require('zod');

const uservalidation = zod.object({
    id: zod.string().nonempty(),
    email: zod.string().email(),
    name:zod.string().min(3).max(1000),
    password:zod.string().min(8).max(1000),
    isloggedIn:zod.boolean().default(false),
});
const postvalidation = zod.object({
    id:zod.string().nonempty(),
    title:String().min(3).max(1000),
    contenct:zod.string().min(3),
    published:zod.boolean().default(false)
})

module.exports={uservalidation,postvalidation}