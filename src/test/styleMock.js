// Mock for CSS modules that returns the class name as-is
export default new Proxy(
	{},
	{
		get: function (target, property) {
			return property;
		},
	}
);

export const __esModule = true;
