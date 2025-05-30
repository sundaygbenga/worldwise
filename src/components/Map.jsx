import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Contexts/CityContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
	//Programatic navigation: moving to any url with the path specified
	// We can also use the navigate function to move forward or backward fro a url position i.e navigate(-1) as used in the form component

	const { cities } = useCities();
	const [mapPosition, setMapPosition] = useState([40, 0]);
	const {
		isLoading: isLoadingPosition,
		position: geoLocationPosition,
		getPosition,
	} = useGeolocation();
	const { mapLat, mapLng } = useUrlPosition();

	// Map position with the url string
	useEffect(
		function () {
			if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
		},
		[mapLat, mapLng]
	);

	// Geolocation Effect
	useEffect(
		function () {
			if (geoLocationPosition)
				setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
		},
		[geoLocationPosition]
	);

	return (
		<div className={`${styles.mapContainer}`}>
			{!geoLocationPosition && (
				<Button type="position" onClick={getPosition}>
					{isLoadingPosition ? "Loading..." : "Use your position"}
				</Button>
			)}
			<MapContainer
				center={mapPosition}
				zoom={6}
				scrollWheelZoom={true}
				className={` ${styles.map}`}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>

				{cities.map((city) => (
					<Marker
						position={[city.position.lat, city.position.lng]}
						key={city.id}
					>
						<Popup>
							<span>{city.emoji}</span>
							<span>{city.cityName}</span>
						</Popup>
					</Marker>
				))}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

// Funtion to move to map center to city position
function ChangeCenter({ position }) {
	const map = useMap();
	// map.setView(position, 6);
	map.setView(position);

	return null;
}

function DetectClick() {
	const navigate = useNavigate();
	useMapEvent({
		click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
}

export default Map;
