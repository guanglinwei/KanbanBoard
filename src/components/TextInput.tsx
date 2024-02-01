interface TextInputInterface {
    value: string;
    label?: React.ReactNode;
    placeholder?: string;
    className?: string;
    onChange?: (x: string) => void;
}

function TextInput({ value, label, placeholder, className, onChange }: TextInputInterface) {
    return (
        <div className={className}>
            {label}
            <input className='ml-3 text-black rounded-sm' type='text' defaultValue={value} placeholder={placeholder} onChange={(e) => onChange?.(e.target.value) || undefined} />
        </div>
    );
}

export default TextInput;