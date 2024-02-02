interface TextInputInterface {
    id: string;
    value: string;
    large?: boolean;
    label?: React.ReactNode;
    labelOnNewLine?: boolean;
    placeholder?: string;
    className?: string;
    onChange?: (x: string) => void;
}

function TextInput({ id, value, large, label, labelOnNewLine, placeholder, className, onChange }: TextInputInterface) {
    const inputProps = {
        id: id,
        className: `${labelOnNewLine ? '' : 'ml-3'} ${large ? 'w-full whitespace-pre-wrap' : ''} text-black px-1 rounded-sm`,
        type: 'text',
        value: value,
        placeholder: placeholder,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange?.(e.target.value) || undefined
    };

    return (
        <div className={className}>
            <span className={labelOnNewLine ? 'block' : ''}>
                {label}
            </span>

            {large ? <textarea {...inputProps} /> : <input {...inputProps} />}
        </div>
    );
}

export default TextInput;