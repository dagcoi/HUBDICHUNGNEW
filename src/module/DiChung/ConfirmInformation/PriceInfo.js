import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import styles from './style'

export default function PriceInfo({ product_chunk_type, detailPrice, cost, send, xhd }) {
    return (
        <View>
            {product_chunk_type === 'hourly_car_rental' &&
                <View>
                    {detailPrice?.saturdayPrice && <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={styles.textBigLeft}>Cuối tuần: </Text>
                        <Text style={styles.textBigRight}>{((detailPrice?.saturdayPrice ?? 0) + (detailPrice?.sundayPrice ?? 0)).format(0, 3, '.')} đ</Text>
                    </View>}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={styles.textBigLeft}>Thời gian thuê: </Text>
                        <Text style={styles.textBigRight}>{detailPrice?.rentDayNumber ?? 0} ngày</Text>
                    </View>
                </View>
            }

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <Text style={styles.textBigLeft}>Đơn giá: </Text>
                <Text style={styles.textBigRight}>{parseInt(cost).format(0, 3, '.') + ' đ '}</Text>
            </View>
            {detailPrice?.slot &&
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={styles.textBigLeft}>Số lượng </Text>
                    <Text style={styles.textBigRight}>{detailPrice?.slot} người</Text>
                </View>
            }

            {send && send.payment && send.payment.tollFee && send.payment.tollFee != 'NA' && send.payment.tollFee != '0' &&
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={styles.textBigLeft}>Phí cầu đường</Text>
                    <Text style={styles.textBigRight}>{parseInt(send.payment.tollFee).format(0, 3, '.') + ' đ '}</Text>
                </View>
            }
            {detailPrice?.invoiceFee &&
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={styles.textBigLeft}>10% VAT </Text>
                    <Text style={styles.textBigRight}>{detailPrice?.invoiceFee.format(0, 3, '.') + ' đ '}</Text>
                </View>
            }
            {detailPrice?.catchInHousePrice &&
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={styles.textBigLeft}>Đón biển tên: </Text>
                    <Text style={styles.textBigRight}>{detailPrice?.catchInHousePrice.format(0, 3, '.') + ' đ '}</Text>
                </View>
            }
            {detailPrice && detailPrice.promotionDiscount && detailPrice.promotionDiscount != 0 &&
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={styles.textBigLeft}>Mã giảm giá:</Text>
                    <Text style={styles.textBigRight}>{(detailPrice?.promotionDiscount).format(0, 3, '.') + ' đ '}</Text>
                </View>
            }
            {detailPrice &&
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={styles.textBigLeft1}>Tổng thanh toán: </Text>
                    <Text style={styles.textBigRight1}>{(detailPrice?.totalPrice ?? 0).format(0, 3, '.') + ' đ '}</Text>
                </View>
            }
        </View>
    )
}

