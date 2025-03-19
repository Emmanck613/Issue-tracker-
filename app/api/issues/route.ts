import { NextRequest, NextResponse } from "next/server";
import { title } from "process";
import { z } from "zod";
import {prisma} from "@/prisma/client";

// Define the shape of the request body
const createIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Cannot excced 255 characters"), 
    description: z.string().min(1, "Description is required").max(255, "Cannot excced 255 characters")
});  

export async function POST(request: NextRequest) {
    const body = await request.json();
    //we validate the request body with our schema
    //safeParse will return the parsed body (object) if it is valid, otherwise it will throw an error
    const validation = createIssueSchema.safeParse(body);

    if(!validation.success) {
        //return a 400 response with the validation errors
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    //we await the call to get the new issue
    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
        }
    });

    return NextResponse.json( newIssue, { status: 201 } );
}