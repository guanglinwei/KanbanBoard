interface CheckboxInputInterface {
    id: string;
    checked: boolean;
    label?: React.ReactNode;
    className?: string;
    onChange?: (x: boolean) => void;
}

function CheckboxInput({ id, checked, label, className, onChange }: CheckboxInputInterface) {
    return (
        <div className={className}>
            <input id={id} className='mx-3 rounded-sm' type='checkbox' checked={checked}
                onChange={(e) => onChange?.(e.target.checked) || undefined} />
            {label}
        </div>
    );
}

export default CheckboxInput;