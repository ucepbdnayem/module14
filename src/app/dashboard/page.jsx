import { headers } from 'next/headers';
import React from 'react'

const page = () => {
    const head = new headers();
    let userName = head.get('userName');
    let userEmail = head.get('userEmail');

    return (
        <div className='text-black'>
            User Name: {userName}<br/>
            User Email: {userEmail}<br/>
        </div>
    )
}

export default page
