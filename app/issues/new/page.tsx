"use client";

import React from 'react'
import { TextField } from "@radix-ui/themes";
import { TextArea } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className='max-w-xl mx-auto space-y-3'>

        <TextField.Root placeholder="Title">
        </TextField.Root>
        <TextArea placeholder="Description"/>
        <Button>
            Submit New Issue
        </Button>
    </div>
  )
}

export default NewIssuePage