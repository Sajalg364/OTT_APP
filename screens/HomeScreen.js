import { View, Text, ScrollView,TouchableOpacity , Platform, } from 'react-native'
// import { TouchableOpacity} from 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import TrendingMovies from '../components/trendingMovies';
import TrendingShows from '../components/trendingShows';
import ShowList from '../components/showList';
import MovieList from '../components/movieList';
import { StatusBar } from 'expo-status-bar';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchTrendingShows, fetchUpcomingMovies, fetchTopRatedShows } from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { styles } from '../theme';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {

  const [trending, setTrending] = useState([]);
  const [trending2, setTrending2] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [topRated2, setTopRated2] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const [toggle,setToggle] = useState(true); 
  let color1 = toggle?'red':'grey';
  let color2 = toggle?'grey':'red';

  useEffect(()=>{
    getTrendingMovies();
    getTrendingShows();
    getUpcomingMovies();
    getTopRatedMovies();
    getTopRatedShows();
  },[]);

  const getTrendingMovies = async ()=>{
    const data = await fetchTrendingMovies();
    console.log('got trending', data.results.length)
    if(data && data.results) setTrending(data.results);
    setLoading(false)
  }
  const getTrendingShows = async ()=>{
    const data = await fetchTrendingShows();
    console.log('got trending2', data.results.length)
    if(data && data.results) setTrending2(data.results);
    setLoading(false)
  }
  const getUpcomingMovies = async ()=>{
    const data = await fetchUpcomingMovies();
    console.log('got upcoming', data.results.length)
    if(data && data.results) setUpcoming(data.results);
  }
  const getTopRatedMovies = async ()=>{
    const data = await fetchTopRatedMovies();
    console.log('got top rated', data.results.length)
    if(data && data.results) setTopRated(data.results);
  }
  const getTopRatedShows = async ()=>{
    const data = await fetchTopRatedShows();
    console.log('got top rated', data.results.length)
    if(data && data.results) setTopRated2(data.results);
  }

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar */}
      <SafeAreaView className={ios? "-mb-2": "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text 
            className="text-white text-3xl font-bold">
              <Text style={styles.text}>O</Text>TT APP
          </Text>
          <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <View style={{flexDirection:'row',justifyContent:'space-around',backgroundColor:'white',padding:10,marginBottom:10, borderRadius:10,elevation:20,shadowColor:'white'}}>
        <TouchableOpacity onPress={()=> setToggle(true)}>
          <Text style={{color:color1}} className={"font-bold"}>Movies</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> setToggle(false)}>
          <Text style={{color:color2}} className={"font-bold"}>Web Series</Text>
        </TouchableOpacity>
      </View>
      {
        loading? (
          <Loading />
        ):(
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{paddingBottom: 10}}
          >
          {
            toggle ? (<View>
              {/* Trending Movies Carousel */}
              { trending.length>0 && <TrendingMovies data={trending} /> }

              {/* upcoming movies row */}
              { upcoming.length>0 && <MovieList title="Upcoming" data={upcoming} /> }
              
              {/* top rated movies row */}
              { topRated.length>0 && <MovieList title="Top Rated" data={topRated} /> }

            </View> ):
            (
              <View>
                {/* Trending Web Series Carousel */}
                { trending2.length>0 && <TrendingShows data={trending2} /> }

                {/* top rated shows row */}
                { topRated2.length>0 && <ShowList title="Top Rated" data={topRated2} />}
              </View>
            )
          } 
          </ScrollView>
        )
      }
  </View>
  )
}
