import plugin from 'tailwindcss/plugin'

export default plugin(function ({ matchUtilities, theme }) {
    const spacingScale = theme('spacing')
    const remToVh = (value: string) => {
        const cleanValue = value.trim()
        const rem = cleanValue.match(/^(\d*\.?\d+)rem$/)?.[1]
        return rem
            ? `calc(${parseFloat(rem) * 16 * 0.09259259259259259}vh)`
            : value
    }
    const remToVw = (value: string) => {
        const cleanValue = value.trim()
        const rem = cleanValue.match(/^(\d*\.?\d+)rem$/)?.[1]
        return rem
            ? `calc(${parseFloat(rem) * 16 * 0.05787037037037037}vw)`
            : value
    }
    const toVh = (value: string) => {
        return typeof value === 'string' && value.endsWith('px')
            ? `calc(${parseFloat(value)} * 0.09259259259259259vh)` // 1px = 0.1447178002894356vh for example
            : `calc(${value} * 1vh)` // fallback
    }

    const toVw = (value: string) => {
        return typeof value === 'string' && value.endsWith('px')
            ? `calc(${parseFloat(value)} * 0.05787037037037037vw)` // 1px = 0.0702247191011236vw for example
            : `calc(${value} * 1vw)` // fallback
    }

    matchUtilities(
        {
            // Padding
            px: (value: string) => {
                return {
                    paddingLeft: remToVw(value),
                    paddingRight: remToVw(value)
                }
            },
            py: (value: string) => ({
                paddingTop: remToVh(value),
                paddingBottom: remToVh(value)
            }),
            pl: (value: string) => ({
                paddingLeft: remToVw(value)
            }),
            pr: (value: string) => ({
                paddingRight: remToVw(value)
            }),
            pt: (value: string) => ({
                paddingTop: remToVh(value)
            }),
            pb: (value: string) => ({
                paddingBottom: remToVh(value)
            }),
            pxvw: (value: string) => ({
                paddingLeft: toVw(value),
                paddingRight: toVw(value)
            }),
            pyvh: (value: string) => ({
                paddingTop: toVh(value),
                paddingBottom: toVh(value)
            }),
            plvw: (value: string) => ({ paddingLeft: toVw(value) }),
            prvw: (value: string) => ({ paddingRight: toVw(value) }),
            ptvh: (value: string) => ({ paddingTop: toVh(value) }),
            pbvh: (value: string) => ({ paddingBottom: toVh(value) }),

            // Margin
            mx: (value: string) => ({
                marginLeft: remToVw(value),
                marginRight: remToVw(value)
            }),
            my: (value: string) => ({
                marginTop: remToVh(value),
                marginBottom: remToVh(value)
            }),
            ml: (value: string) => ({ marginLeft: remToVw(value) }),
            mr: (value: string) => ({ marginRight: remToVw(value) }),
            mt: (value: string) => ({ marginTop: remToVh(value) }),
            mb: (value: string) => ({ marginBottom: remToVh(value) }),

            mxvw: (value: string) => ({
                marginLeft: toVw(value),
                marginRight: toVw(value)
            }),
            myvh: (value: string) => ({
                marginTop: toVh(value),
                marginBottom: toVh(value)
            }),
            mlvw: (value: string) => ({ marginLeft: toVw(value) }),
            mrvw: (value: string) => ({ marginRight: toVw(value) }),
            mtvh: (value: string) => ({ marginTop: toVh(value) }),
            mbvh: (value: string) => ({ marginBottom: toVh(value) }),
            // Position
            top: (value: string) => ({ top: remToVh(value) }),
            bottom: (value: string) => ({ bottom: remToVh(value) }),
            left: (value: string) => ({ left: remToVw(value) }),
            right: (value: string) => ({ right: remToVw(value) }),

            topvh: (value: string) => ({ top: toVh(value) }),
            bottomvh: (value: string) => ({ bottom: toVh(value) }),
            leftvw: (value: string) => ({ left: toVw(value) }),
            rightvw: (value: string) => ({ right: toVw(value) }),

            //gap
            'gap-x': (value: string) => ({ columnGap: remToVw(value) }),
            'gap-y': (value: string) => ({ rowGap: remToVh(value) }),
            gap: (value: string) => ({ gap: remToVw(value) }),

            // width
            w: (value: string) => ({ width: remToVw(value) }),
            h: (value: string) => ({ height: remToVh(value) }),
            wvh: (value: string) => ({ width: toVw(value) }),
            hvh: (value: string) => ({ height: toVh(value) })
        },
        { values: spacingScale }
    )
})
