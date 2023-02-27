import postcssPresetEnv from 'postcss-preset-env'
import tailwindcss from 'tailwindcss'

/** @type {import('postcss').Postcss} */
const config = {
  plugins: [
    postcssPresetEnv({
      stage: 3,
      autoprefixer: {
        flexbox: 'no-2009',
      },
      features: {
        'nesting-rules': true,
      },
    }),
    tailwindcss({}),
  ],
}

export default config
