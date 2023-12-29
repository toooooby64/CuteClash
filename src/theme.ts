import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const theme: CustomThemeConfig = {
	name: 'theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '0 0 0',
		'--on-success': '255 255 255',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #ec5cb8
		'--color-primary-50': '252 231 244', // #fce7f4
		'--color-primary-100': '251 222 241', // #fbdef1
		'--color-primary-200': '250 214 237', // #fad6ed
		'--color-primary-300': '247 190 227', // #f7bee3
		'--color-primary-400': '242 141 205', // #f28dcd
		'--color-primary-500': '236 92 184', // #ec5cb8
		'--color-primary-600': '212 83 166', // #d453a6
		'--color-primary-700': '177 69 138', // #b1458a
		'--color-primary-800': '142 55 110', // #8e376e
		'--color-primary-900': '116 45 90', // #742d5a
		// secondary | #e62afa
		'--color-secondary-50': '251 223 254', // #fbdffe
		'--color-secondary-100': '250 212 254', // #fad4fe
		'--color-secondary-200': '249 202 254', // #f9cafe
		'--color-secondary-300': '245 170 253', // #f5aafd
		'--color-secondary-400': '238 106 252', // #ee6afc
		'--color-secondary-500': '230 42 250', // #e62afa
		'--color-secondary-600': '207 38 225', // #cf26e1
		'--color-secondary-700': '173 32 188', // #ad20bc
		'--color-secondary-800': '138 25 150', // #8a1996
		'--color-secondary-900': '113 21 123', // #71157b
		// tertiary | #e18c8c
		'--color-tertiary-50': '251 238 238', // #fbeeee
		'--color-tertiary-100': '249 232 232', // #f9e8e8
		'--color-tertiary-200': '248 226 226', // #f8e2e2
		'--color-tertiary-300': '243 209 209', // #f3d1d1
		'--color-tertiary-400': '234 175 175', // #eaafaf
		'--color-tertiary-500': '225 140 140', // #e18c8c
		'--color-tertiary-600': '203 126 126', // #cb7e7e
		'--color-tertiary-700': '169 105 105', // #a96969
		'--color-tertiary-800': '135 84 84', // #875454
		'--color-tertiary-900': '110 69 69', // #6e4545
		// success | #4a0c34
		'--color-success-50': '228 219 225', // #e4dbe1
		'--color-success-100': '219 206 214', // #dbced6
		'--color-success-200': '210 194 204', // #d2c2cc
		'--color-success-300': '183 158 174', // #b79eae
		'--color-success-400': '128 85 113', // #805571
		'--color-success-500': '74 12 52', // #4a0c34
		'--color-success-600': '67 11 47', // #430b2f
		'--color-success-700': '56 9 39', // #380927
		'--color-success-800': '44 7 31', // #2c071f
		'--color-success-900': '36 6 25', // #240619
		// warning | #cd3bc6
		'--color-warning-50': '248 226 246', // #f8e2f6
		'--color-warning-100': '245 216 244', // #f5d8f4
		'--color-warning-200': '243 206 241', // #f3cef1
		'--color-warning-300': '235 177 232', // #ebb1e8
		'--color-warning-400': '220 118 215', // #dc76d7
		'--color-warning-500': '205 59 198', // #cd3bc6
		'--color-warning-600': '185 53 178', // #b935b2
		'--color-warning-700': '154 44 149', // #9a2c95
		'--color-warning-800': '123 35 119', // #7b2377
		'--color-warning-900': '100 29 97', // #641d61
		// error | #6c175d
		'--color-error-50': '233 220 231', // #e9dce7
		'--color-error-100': '226 209 223', // #e2d1df
		'--color-error-200': '218 197 215', // #dac5d7
		'--color-error-300': '196 162 190', // #c4a2be
		'--color-error-400': '152 93 142', // #985d8e
		'--color-error-500': '108 23 93', // #6c175d
		'--color-error-600': '97 21 84', // #611554
		'--color-error-700': '81 17 70', // #511146
		'--color-error-800': '65 14 56', // #410e38
		'--color-error-900': '53 11 46', // #350b2e
		// surface | #407a83
		'--color-surface-50': '226 235 236', // #e2ebec
		'--color-surface-100': '217 228 230', // #d9e4e6
		'--color-surface-200': '207 222 224', // #cfdee0
		'--color-surface-300': '179 202 205', // #b3cacd
		'--color-surface-400': '121 162 168', // #79a2a8
		'--color-surface-500': '64 122 131', // #407a83
		'--color-surface-600': '58 110 118', // #3a6e76
		'--color-surface-700': '48 92 98', // #305c62
		'--color-surface-800': '38 73 79', // #26494f
		'--color-surface-900': '31 60 64' // #1f3c40
	}
};
