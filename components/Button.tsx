import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types'
import { colors, radius } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import Loading from './Loading'
import Typo from './Typo'

const Button = ({
    style,
    onPress,
    loading = false,
    children,
    title,
    textStyle
}: CustomButtonProps) => {

    if(loading){
        return(
            <View style={[styles.button, style, {backgroundColor: 'transparent'}]}>
                <Loading/>
            </View>
        )
    }

    const content = title ? (
        <Typo style={textStyle}>{title}</Typo>
    ) : children

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            {content}
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: radius._17,
        borderCurve: "continuous",
        height: verticalScale(52),
        justifyContent: "center",
        alignItems: "center",
    }
})