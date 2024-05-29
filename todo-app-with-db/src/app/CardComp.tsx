import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import DropDownMenuForCard from './dropDownMenuForCard';


interface CardCompProps {
    todoTitle: string;
    todoMessage: string;
    todoDate: string;
    todoCompleted: string;
}

const CardComp: React.FC<CardCompProps> = ({
    todoTitle,
    todoMessage,
    todoDate,
    todoCompleted
}) => {
    console.log('todoCompleted', todoCompleted);

    return (
        <Card className='w-max min-w-[300px]'>
            <div className='align-right float-right'>
                <DropDownMenuForCard id={todoCompleted} />
            </div>

            <CardHeader>
                <CardTitle>{todoTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{todoMessage}</p>
            </CardContent>
            <CardFooter >
                <CardDescription>Created at {todoDate}</CardDescription>
            </CardFooter>

        </Card>
    );
}

export default CardComp;