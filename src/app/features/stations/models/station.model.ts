export interface StationsApiResponse {
  total_count: number;
  results: StationApiRecord[];
}

export interface StationApiRecord {
  ident: number;
  nom: string;
  commune: string;
  etat: string;
  nbvelos: number;
  nbplaces: number;
  nbelec: number;
  nbclassiq: string;
  mdate: string;
  geo_point_2d: {
    lat: number;
    lon: number;
  };
}

export interface Station {
  id: number;
  name: string;
  city: string;
  status: string;
  bikesAvailable: number;
  docksAvailable: number;
  electricBikesAvailable: number;
  classicBikesAvailable: number;
  updatedAt: string;
  latitude: number;
  longitude: number;
}

export function mapStationApiRecord(record: StationApiRecord): Station {
  return {
    id: record.ident,
    name: record.nom,
    city: record.commune,
    status: record.etat,
    bikesAvailable: record.nbvelos,
    docksAvailable: record.nbplaces,
    electricBikesAvailable: record.nbelec,
    classicBikesAvailable: Number(record.nbclassiq),
    updatedAt: record.mdate,
    latitude: record.geo_point_2d.lat,
    longitude: record.geo_point_2d.lon,
  };
}