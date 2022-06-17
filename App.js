import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import { getMeteoByDay, getDays } from './src/tools/helper';



export default function App() {
  const keyAPI = 'd2bdb897ab7bf0a014bebd7309e6026b'

  const [city, setCity] = useState('Paris')
  const [infoCity, setInfoCity] = useState({});
  const [forecast, setForecast] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [showForecastDay, setShowForecastDay] = useState([]);


  const days = getDays();
  console.log(days);



  const image = { uri: "https://www.pourquoidonc.com/wp-content/uploads/2020/12/Ciel-bleu.jpg" };


  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&exclude=minutely&units=metric&lang=fr&appid=${keyAPI}`)
      .then(response => {
        if (response.status === 200) {
          setForecast(getMeteoByDay(response.data.list));
          setInfoCity(response.data.city);
          setShowForecastDay(getMeteoByDay(response.data.list)[0]);
          setIsValid(true)
        }
      })
      .catch(error => {
        setIsValid(false)
      })
  }
    , [city]);

  console.log(forecast);
  console.log(infoCity);




  return (


    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>

        <TextInput
          value={city}
          onChangeText={text => setCity(text)}
          placeholder="Enter a city"
          style={styles.input}
        />
        {isValid &&
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 45, textAlign: "center", color: "white" }}>{infoCity.name}</Text>
            <View style={{ flexDirection: "row", justifyContent: "center", margin: 15 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: "center", textTransform: 'capitalize', color: "white" }}>{forecast[0][0].weather[0].description}</Text>
              <Image style={styles.logo} source={{
                uri: `http://openweathermap.org/img/wn/${forecast[0][0].weather[0].icon}@2x.png`,
              }}></Image>
            </View>


            {days.map((day, index) => {

              return (
                <View key={index}>
                  <TouchableOpacity onPress={() => setShowForecastDay(forecast[index])} style={{ backgroundColor: 'white' }}>
                    <Text>{index == 0 ? "Aujourd'hui" : index == 1 ? "Demain" : day}</Text>
                    <Text style={{ fontSize: 25, color: "white", margin: 15 }}>{days[0]}</Text>
                  </TouchableOpacity>
                </View>
              )

            })}

            <View style={{ flexDirection: "row", justifyContent: "space-evenly", backgroundColor: "black", opacity: 0.60 }}>

              <Text style={{ fontSize: 25, color: "white", margin: 15 }}>Actuellement: {showForecastDay[0].main.temp}°</Text>
              <Text style={{ fontSize: 25, color: "white", margin: 15 }}>Ressenti: {showForecastDay[0].main.feels_like}°</Text>
              <Text style={{ fontSize: 25, color: "white", margin: 15 }}>Min: {showForecastDay[0].main.temp_min}°</Text>

            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-evenly", backgroundColor: "black", opacity: 0.60 }}>
              <Text style={{ fontSize: 25, color: "white", margin: 15 }}>Max: {showForecastDay[0].main.temp_max}°</Text>
              <Text style={{ fontSize: 25, color: "white", margin: 15 }}>Humidité: {showForecastDay[0].main.humidity}%</Text>
              <Text style={{ fontSize: 25, color: "white", margin: 15 }}>Vent: {showForecastDay[0].wind.speed} km/h</Text>
            </View>

          </View>
        }
        {!isValid &&
          <View>
            <Text>Veuillez entrer une ville valide</Text>
          </View>
        }
      </ImageBackground>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginTop: 20,
    borderWidth: 5,
    borderColor: 'black',
    backgroundColor: 'white',
    opacity: 0.9,
    padding: 10,
    margin: 0,
    width: '100%',
    borderRadius: 10,
    fontSize: 30,
  },
  logo: {
    width: 50,
    height: 50,
    margin: -10,
  },
  image: {
    flex: 1,
  },
});