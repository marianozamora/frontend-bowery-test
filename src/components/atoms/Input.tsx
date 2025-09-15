import React from "react";
import AnimatedButton from "./AnimatedButton";
import styles from "./Input.module.scss";

export interface InputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSend: () => void;
	disabled?: boolean;
	placeholder?: string;
	className?: string;
	onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
	value,
	onChange,
	onSend,
	disabled,
	placeholder = "Escribe tu mensaje...",
	className,
	onKeyPress,
}) => (
	<div className={`${styles.inputContainer} ${className || ""}`}>
		<input
			className={styles.input}
			type='text'
			value={value}
			onChange={onChange}
			disabled={disabled}
			placeholder={placeholder}
			aria-label={placeholder}
			onKeyDown={(e) => {
				if (e.key === "Enter") onSend();
			}}
			onKeyPress={onKeyPress}
		/>
		<AnimatedButton
			variant='primary'
			size='medium'
			onClick={onSend}
			disabled={disabled || !value.trim()}
			className={styles.sendButton}
		>
			➤
		</AnimatedButton>
	</div>
);

export default Input;
