import s from './Button.module.scss'
type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit';
};

export const Button = ({ children, onClick, disabled, type = 'button' }: ButtonProps) => {
    return (
        <button onClick={onClick} disabled={disabled} className={s.button} type={type}>
            {children}
        </button>
    );
};