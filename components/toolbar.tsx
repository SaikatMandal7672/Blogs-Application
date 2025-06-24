import { ImageIcon } from 'lucide-react'
import React from 'react'
import {
    ComponentRef,
    useRef,
    useState
} from 'react'
import { Button } from './ui/button'
import { BlogInterface } from '@/lib/types'
import TextareaAutosize from "react-textarea-autosize";
import CoverImageDialog from './cover-image-dialog'
interface ToolbarProps {
    initialData: BlogInterface
}

const Toolbar = () => {
    const inputRef = useRef<ComponentRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState("Untitled");
    const enableInput = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            setValue(value);
        }, 0);
    };
    const disableInput = () => setIsEditing(false);

    const onInput = (value: string) => {
        setValue(value);
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            disableInput();
        }
    };

    return (
        <div className='pl-[54px] group relative'>
            <div className="opacity-0  group-hover:opacity-100 flex items-center gap-x-1 py-4">
                <CoverImageDialog />
            </div>
            {isEditing ? (
                <TextareaAutosize
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(event) => onInput(event.target.value)}
                    className=" resize-none bg-transparent outline-none text-5xl font-bold text-[#3f3f3f] break-words dark:text-[#cfcfcf]"
                />
            ) : (
                <div
                    onClick={enableInput}
                    className="font-bold pb-[11.5px] break-words outline-none text-5xl
        text-[#3f3f3f]  dark:text-[#cfcfcf]"
                >
                    {value}
                </div>
            )}
        </div>
    )
}

export default Toolbar