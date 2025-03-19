"use client";

import React from 'react'
import { useState } from 'react';
import { TextField, Callout, Button } from "@radix-ui/themes";
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
  //state variable for error handling. With typescript we can define the type of the state variable
  const [error, setError] = useState<string | null>(null);
   
  const onSubmit = async (data: NewIssueForm) => {
    //we send the form data to the server using axios
    console.log(data);
    // setError(null);
    try {
      const response = await axios.post('/api/issues', data);
      console.log(response.data);
      if(response.status === 201){
        router.push('/issues');
      }
    } catch (error) {
      console.log(error);
      setError('Failed to create new issue');
    } finally{
      //we clear the error message after 5 seconds
      //we pass a function to our setTimeout to clear the error message
      setTimeout(() => {
        setError(null);
      }
      , 5000);
    }
  }

  return (
    <div className='max-w-xl mx-auto '>

      { //render only when we have an error
        error &&
        <Callout.Root variant="surface" color='red' className='mb-2 p-2 '>
          <Callout.Text>
          {error}
          </Callout.Text>
        </Callout.Root>

      }
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className='space-y-3 p-1'
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
    </div>

  )
}

export default NewIssuePage