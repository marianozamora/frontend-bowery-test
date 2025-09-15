import React from "react";

interface IconProps {
	size?: number;
	color?: string;
	className?: string;
}

export const MicIcon: React.FC<IconProps> = ({
	size = 24,
	color = "currentColor",
	className,
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		className={className}
	>
		<path
			d='M12 2C10.34 2 9 3.34 9 5v6c0 1.66 1.34 3 3 3s3-1.34 3-3V5c0-1.66-1.34-3-3-3z'
			fill={color}
		/>
		<path
			d='M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z'
			fill={color}
		/>
	</svg>
);

export const ChatIcon: React.FC<IconProps> = ({
	size = 24,
	color = "currentColor",
	className,
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		className={className}
	>
		<path
			d='M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z'
			fill={color}
		/>
	</svg>
);

export const InsightsIcon: React.FC<IconProps> = ({
	size = 24,
	color = "currentColor",
	className,
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		className={className}
	>
		<path
			d='M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7 0-3.9-3.1-7-7-7z'
			fill={color}
		/>
	</svg>
);

export const ExploreIcon: React.FC<IconProps> = ({
	size = 24,
	color = "currentColor",
	className,
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		className={className}
	>
		<path
			d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'
			fill={color}
		/>
	</svg>
);

export const IrisIcon: React.FC<IconProps> = ({
	size = 24,
	color = "currentColor",
	className,
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		className={className}
	>
		<circle cx='12' cy='12' r='8' fill={color} opacity='0.3' />
		<circle cx='12' cy='12' r='4' fill={color} />
		<circle cx='12' cy='12' r='2' fill='white' opacity='0.8' />
	</svg>
);

export const TypeIcon: React.FC<IconProps> = ({
	size = 24,
	color = "currentColor",
	className,
}) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 24 24'
		fill='none'
		className={className}
	>
		<path d='M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z' fill={color} />
	</svg>
);
