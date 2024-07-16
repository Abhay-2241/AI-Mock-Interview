"use client"

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { chatSession } from '@/utils/GeminiAiModel';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobDescp, setJobDescp] = useState('');
    const [jobExp, setJobExp] = useState('');
    const [jobPosition, setJobPosition] = useState('');
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const { user } = useUser();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(jobDescp, jobExp, jobPosition);

        const InputPrompt = `Job Position: ${jobPosition} Job Description: ${jobDescp} Year of Experience: ${jobExp} based on the following data give 5 interview questions and answers in JSON format`;
        const result = await chatSession.sendMessage(InputPrompt);
        let MockJsonResp = await result.response.text();

        // Clean the response string
        MockJsonResp = MockJsonResp.replace('```json', '').replace('```', '').trim();

        // Debug the response
        // console.log("Raw Response:", MockJsonResp);

        try {
            const parsedResponse = JSON.parse(MockJsonResp);
            console.log(parsedResponse);
            setJsonResponse(parsedResponse);

            if (parsedResponse) {
                const resp = await db.insert(MockInterview).values({
                    mockId: uuidv4(),
                    jsonMockResp: MockJsonResp,
                    jobDesc: jobDescp,
                    jobPosition: jobPosition,
                    jobExp: jobExp,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createAt: moment().format('DD-MM-YYYY')
                }).returning({ mockId: MockInterview.mockId });

                console.log("Inserted ID", resp);
            } else {
                console.log("ERROR");
            }
        } catch (error) {
            console.error("Failed to parse JSON response:", error);
        }

        setLoading(false);
    }

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDialog(true)}>
                <h2 className='font-bold text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className="bg-green-300">
                    <DialogHeader>
                        <DialogTitle>Tell us more about yourself!</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Kindly, add details about your job position/role</h2>
                                    <div className='mt-7 my-3'>
                                        <label>Job role/Job Position</label>
                                        <Input placeholder="Ex. Full stack developer " required
                                            onChange={(e) => setJobPosition(e.target.value)}
                                        />
                                    </div>
                                    <div className='mt-7 my-3'>
                                        <label>Job Description / Tech-stack</label>
                                        <Textarea placeholder="Ex. NextJs , Typescript " required
                                            onChange={(e) => setJobDescp(e.target.value)}
                                        />
                                    </div>
                                    <div className='mt-7 my-3'>
                                        <label>Years of Experience</label>
                                        <Input type="number" placeholder="Ex. 5" max="15" required
                                            onChange={(e) => setJobExp(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end  p-4'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)} className='bg-white'> Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ?
                                            <>
                                                <LoaderCircle className='animate-spin' />'Generating from AI' </> : 'Start Interview'
                                        } Start Interview</Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}


export default AddNewInterview;