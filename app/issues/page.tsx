import React from 'react'
import { Button } from "@radix-ui/themes";
import Link from 'next/link';

const UsersPage = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">
          Create Issue
        </Link>
      </Button>
    </div>
  )
}

export default UsersPage