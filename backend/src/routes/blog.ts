import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { PrismaClientExtends } from "@prisma/client/extension";
import { createBlogInput, updateBlogInput } from "@alsonwangkhem/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*", async (c, next) => {
    //extract the user id and pass it down to the route handler
    const authHeader = c.req.header("Authorization") || "";
    const user = await verify(authHeader, c.env.JWT_SECRET);
    try {
        if (user) {
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "you are not logged in"
            })
        }
    }
    catch(error) {
        c.status(403);
            return c.json({
                message: "you are not logged in"
            })
    }
})
function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate: string = new Date(date).toLocaleDateString('en-US', options);
  
    // Extract day using regular expression
    const dayMatch = formattedDate.match(/^(\d+)/);
    const day = dayMatch ? parseInt(dayMatch[1], 10) : NaN;
  
    // Determine the ordinal suffix for the day
    let suffix: string;
    if (!isNaN(day)) {
      if (day === 1 || day === 21 || day === 31) {
        suffix = 'st';
      } else if (day === 2 || day === 22) {
        suffix = 'nd';
      } else if (day === 3 || day === 23) {
        suffix = 'rd';
      } else {
        suffix = 'th';
      }
    } else {
      return formattedDate; // Return original formatted date if day extraction fails
    }
  
    // Replace day in the formatted date with day plus ordinal suffix
    return formattedDate.replace(/^\d+/, day + suffix);
  }
blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        message: "inputs are not correct"
      })
    }
    const authorId = c.get("userId");
    
      
      // Example usage:
    const currentDate: Date = new Date();
    const formattedDate: string = formatDate(currentDate);  
    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number (authorId),
            publishedDate: formattedDate
        }
    })
    return c.json({
        id: blog.id
    })
})
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({
        message: "inputs are not correct"
      })
    }
    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })
    return c.json({
        id: blog.id
    })
})
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const blogs = await prisma.blog.findMany({
        select: {
            title: true,
            content: true,
            id: true,
            publishedDate: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });
    return c.json({
        blogs
    })
})
blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const id = await c.req.param("id");
    try {
        
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id) 
            },
            select: {
                id: true,
                title: true,
                content: true,
                publishedDate: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({
            blog
        })
    }
    catch(e) {
        c.status(411);
        return c.json({
            message: "error while fetching blog post"
        });
    }
})
  