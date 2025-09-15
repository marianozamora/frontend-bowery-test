import React, { memo, useCallback } from "react";
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

const Input: React.FC<InputProps> = memo(
	({
		value,
		onChange,
		onSend,
		disabled,
		placeholder = "Escribe tu mensaje...",
		className,
		onKeyPress,
	}) => {
		const handleKeyDown = useCallback(
			(e: React.KeyboardEvent<HTMLInputElement>) => {
				if (e.key === "Enter") {
					onSend();
				}
			},
			[onSend]
		);

		const isDisabled = disabled || !value.trim();

		return (
			<div className={`${styles.inputContainer} ${className || ""}`}>
				<input
					className={styles.input}
					type='text'
					value={value}
					onChange={onChange}
					disabled={disabled}
					placeholder={placeholder}
					aria-label={placeholder}
					onKeyDown={handleKeyDown}
					onKeyPress={onKeyPress}
				/>
				<AnimatedButton
					variant='primary'
					size='medium'
					onClick={onSend}
					disabled={isDisabled}
					className={styles.sendButton}
				>
					➤
				</AnimatedButton>
			</div>
		);
	}
);

Input.displayName = "Input";

export default Input;
