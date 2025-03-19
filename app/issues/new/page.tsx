"use client";

import React from 'react'
import { TextField, TextArea, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller} from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';

//we define the form interface (shape of the form data) 
interface NewIssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  //we use react-hook-form to manage the form state
  const { register, control, handleSubmit } = useForm<NewIssueForm>();
  //we use the next.js router to navigate to different pages
  const router = useRouter();
   
  const onSubmit = async (data: NewIssueForm) => {
    //we send the form data to the server using axios
    console.log(data);
    try {
      const response = await axios.post('/api/issues', data);
      console.log(response.data);
      if(response.status === 201){
        router.push('/issues');
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create new issue');
    }
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className='max-w-xl mx-auto space-y-3'
    >

        {/* Using the spread operator (...) to add the title prop to our component */}
        <TextField.Root placeholder="Title" {...register("title")}>
        </TextField.Root>
        {/* For our markdown component we cannot use register, instead we use 
        a controller component to bind the value of the markdown editor 
        to the form state. 
        */}
        <Controller 
          name='description' 
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field}/>
          )}  
        />
        <Button>
            Submit New Issue
        </Button>
    </form>
  )
}

export default NewIssuePage