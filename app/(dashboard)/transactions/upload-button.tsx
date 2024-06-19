import { Upload } from "lucide-react";
import { useCSVReader } from 'react-papaparse'

import { Button } from "@/components/ui/button";

type Props = {
    onUpload: (data: any) => void;
}

export const UploadButton = ({ onUpload }: Props) => {
    const { CSVReader } = useCSVReader();

    // add paywall
    return (
        <CSVReader onUploadAccepted={onUpload}>
            {({ getRootProps }: any) => ( 
                <Button
                    size="sm"
                    className="w-full bg-emerald-600 hover:bg-emerald-500"
                    {...getRootProps()}
                >
                    <Upload className="size-4 mr-2"/>
                    <span>Import</span>
                </Button>
            )}
        </CSVReader>
    )
};