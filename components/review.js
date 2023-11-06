import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, StyleSheet} from 'react-native'
import React, {useState} from 'react';
import { fallbackPersonImage, image185, image342 } from '../api/moviedb';
var { width, height } = Dimensions.get('window');

const Rating = ({ rate }) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rate / 2); i++) {
        console.log('star');
        stars.push(<View key={`star-${i}`}><Image source={require('../assets/images/fullStar.png')} style={{ width: 14, height: 14 }} /></View>);
    }
    for (let i = 0; i < 5 - rate / 2; i++) {
        console.log('empty star');
        stars.push(<View key={`empty-star-${i}`}><Image source={require('../assets/images/emptyStar.png')} style={{ width: 14, height: 14 }} /></View>);
    }
    return <View style={styles.ratingBox}>{stars}</View>;
};

export default function Review({ reviews, navigation }) {
    const [showMore, setShowMore] = useState(false);
    return (
        <View className="my-6">
            <View className="flex-row justify-between">
                <Text className="text-white text-lg mx-4 mb-5">Ratings and Reviews</Text>
                <TouchableOpacity style={{ marginRight: width / 48.875, opacity: 0.6 }} onPress={() => { console.log('Ratings and Reviews Button Pressed'); }}>
                    <Image source={require('../assets/images/arrow-right.png')} style={{ width: 24, height: 24, marginRight: 8 }} />
                </TouchableOpacity>
            </View>

            <ScrollView
                vertical
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    reviews && reviews.map((person, index) => {
                        return (
                            <View style={styles.List}>
                                <View style={styles.NameHead}>
                                    <View style={[styles.ReviewProfile]} >
                                        {/* <Text style={styles.ReviewProfileLetter}>{person.author.slice(0, 1)}</Text> */}
                                        <Image source={{ uri: image185(person?.author_details.avatar_path) || fallbackPersonImage }} style={{ width: 30, height: 30, borderRadius: 15 }} />
                                    </View>
                                    <Text style={styles.ReviewName}>{person.author}</Text>
                                </View>
                                <View style={styles.rate_dateBox}>
                                    <Rating rate={person.author_details.rating} />
                                    <Text style={styles.ReviewDate}>{person.updated_at.slice(0, 10)}</Text>
                                </View>
                                <View>
                                    {/* <Text className="text-white">{person.content.slice(0, 200)}</Text> */}
                                    {person.content.length > 120 ? (
                                        showMore ? (
                                            <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                                                <Text style={styles.postDescription}>{person.content}</Text>
                                                <Text style={styles.seeMore}>Show less</Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => setShowMore(!showMore)}>
                                                <Text style={styles.postDescription}>
                                                    {`${person.content.slice(0, 120)}... `}
                                                </Text>
                                                <Text style={styles.seeMore}>Show more</Text>
                                            </TouchableOpacity>
                                        )
                                    ) : (
                                        <Text style={styles.postDescription}>{person.content}</Text>
                                    )}
                                </View>
                            </View>
                        )
                    })
                }

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    List: {
        width: '100%',
        paddingVertical: height / 99.125,
    },
    NameHead: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: width / 78.2,
    },
    ReviewProfile: {
        width: width / 11.17,
        height: width / 11.17,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ReviewName: {
        fontSize: width / 24.438,
        // fontFamily: 'SF-Pro-Text-Medium',
        color: 'red',
        marginLeft: width / 39.1,
    },
    rate_dateBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: width / 78.2,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: width / 39,
    },
    ReviewDate: {
        fontSize: width / 32.58,
        // fontFamily: 'SF-Pro-Text-Regular',
        color: 'grey',
        letterSpacing: 0.7,
    },
    postContentContainer: {
        // borderWidth: 1,
        // borderColor: 'red',
        flexDirection: 'column',
      },
    
      postMedia: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: '100%',
        height: 280,
        resizeMode: 'cover',
      },
    
      postDescription: {
        color: 'white',
      },
    
      seeMore: {
        color: 'grey',
        fontStyle: 'italic',
        textDecorationLine: 'underline',
      },
});