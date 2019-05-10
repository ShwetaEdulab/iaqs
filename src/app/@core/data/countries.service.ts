import { Injectable } from '@angular/core';

@Injectable()
export class CountriesService {

  data = [{
    "id": 1,
    "code": "AF",
    "name": "Afghanistan",
    "phonecode": "93",
    "image": "Afghanistan.png",
    "embassy_email": "cg.mesharif@mea.gov.in,cg.jalalabad@mea.gov.in,hoc.jalalabad@mea.gov.in,cons.kandahar@mea.gov.in,cg.herat@mea.gov.in, tskabul@gmail.com,cg.herat@mea.gov.in,cons.herat@mea.gov.in"
}, {
    "id": 2,
    "code": "AL",
    "name": "Albania",
    "phonecode": "355",
    "image": "Albania.png",
    "embassy_email": "petraqgramo@megapharm.net "
}, {
    "id": 3,
    "code": "DZ",
    "name": "Algeria",
    "phonecode": "213",
    "image": "Algeria.png",
    "embassy_email": "amb.algiers@mea.gov.in, hoc.algiers@mea.gov.in, cons.algiers@mea.gov.in"
}, {
    "id": 4,
    "code": "DS",
    "name": "American Samoa",
    "phonecode": "1684",
    "image": "American Samoa.png",
    "embassy_email": ""
}, {
    "id": 5,
    "code": "AD",
    "name": "Andorra",
    "phonecode": "376",
    "image": "Andorra.png",
    "embassy_email": null
}, {
    "id": 6,
    "code": "AO",
    "name": "Angola",
    "phonecode": "244",
    "image": "Angola.png",
    "embassy_email": "amb.luanda@mea.gov.in, hoc.luanda@mea.gov.in"
}, {
    "id": 7,
    "code": "AI",
    "name": "Anguilla",
    "phonecode": "1264",
    "image": "Anguilla.png",
    "embassy_email": null
}, {
    "id": 8,
    "code": "AQ",
    "name": "Antarctica",
    "phonecode": "0",
    "image": "Antarctica.png",
    "embassy_email": null
}, {
    "id": 9,
    "code": "AG",
    "name": "Antigua and Barbuda",
    "phonecode": "1268",
    "image": "Antigua & Barbuda.png",
    "embassy_email": null
}, {
    "id": 10,
    "code": "AR",
    "name": "Argentina",
    "phonecode": "54",
    "image": "Argentina.png",
    "embassy_email": "consular@indembarg.org.ar,frontdesk@indembarg.org.ar"
}, {
    "id": 11,
    "code": "AM",
    "name": "Armenia",
    "phonecode": "374",
    "image": "Armenia.png",
    "embassy_email": "hoc@embassyofindia.am, attache@embassyofindia.am"
}, {
    "id": 12,
    "code": "AW",
    "name": "Aruba",
    "phonecode": "297",
    "image": "Aruba.png",
    "embassy_email": null
}, {
    "id": 13,
    "code": "AU",
    "name": "Australia",
    "phonecode": "61",
    "image": "Australia.png",
    "embassy_email": null
}, {
    "id": 14,
    "code": "AT",
    "name": "Austria",
    "phonecode": "43",
    "image": "Austria.png",
    "embassy_email": "indemb@eoivien.vienna.at"
}, {
    "id": 15,
    "code": "AZ",
    "name": "Azerbaijan",
    "phonecode": "994",
    "image": "Azerbaijan.png",
    "embassy_email": null
}, {
    "id": 16,
    "code": "BS",
    "name": "Bahamas",
    "phonecode": "1242",
    "image": "Bahamas.png",
    "embassy_email": null
}, {
    "id": 17,
    "code": "BH",
    "name": "Bahrain",
    "phonecode": "973",
    "image": "Bahrain.png",
    "embassy_email": "hoc.bahrain@mea.gov.In, cons.bahrain@mea.gov.in"
}, {
    "id": 18,
    "code": "BD",
    "name": "Bangladesh",
    "phonecode": "880",
    "image": "Bangladesh.png",
    "embassy_email": "hcoffice@hcidhaka.gov.in, informa@hcidhaka.gov.in"
}, {
    "id": 19,
    "code": "BB",
    "name": "Barbados",
    "phonecode": "1246",
    "image": "Barbados.png",
    "embassy_email": "hcindiabds@caribsurf.com, hcindiabds@caribsurf.com"
}, {
    "id": 20,
    "code": "BY",
    "name": "Belarus",
    "phonecode": "375",
    "image": "Belarus.png",
    "embassy_email": "amb@indemb.bn.by, amb.minsk@mea.gov.in;hoc.minsk@mea.gov.in"
}, {
    "id": 21,
    "code": "BE",
    "name": "Belgium",
    "phonecode": "32",
    "image": "Belgium.png",
    "embassy_email": "hoc@indembassy.be"
}, {
    "id": 22,
    "code": "BZ",
    "name": "Belize",
    "phonecode": "501",
    "image": "Belize.png",
    "embassy_email": null
}, {
    "id": 23,
    "code": "BJ",
    "name": "Benin",
    "phonecode": "229",
    "image": "Benin.png",
    "embassy_email": "Indconsul.benin@sify.com, ashokmir@yahoo.com, ashokmir@gmail.com"
}, {
    "id": 24,
    "code": "BM",
    "name": "Bermuda",
    "phonecode": "1441",
    "image": "Bermuda.png",
    "embassy_email": null
}, {
    "id": 25,
    "code": "BT",
    "name": "Bhutan",
    "phonecode": "975",
    "image": "Bhutan.png",
    "embassy_email": "eoiss@druknet.bt,amb.thimphu@mea.gov.in, hoc.thimphu@mea.gov.in, cons.thimphu@mea.gov.in"
}, {
    "id": 26,
    "code": "BO",
    "name": "Bolivia",
    "phonecode": "591",
    "image": "Bolivia.png",
    "embassy_email": null
}, {
    "id": 27,
    "code": "BA",
    "name": "Bosnia and Herzegovina",
    "phonecode": "387",
    "image": "Bosnia & Herzegovina.png",
    "embassy_email": "abhind@gmail.com"
}, {
    "id": 28,
    "code": "BW",
    "name": "Botswana",
    "phonecode": "267",
    "image": "Botswana.png",
    "embassy_email": "hoc@hci.org.bw, hc.gaborone@mea.gov.in"
}, {
    "id": 29,
    "code": "BV",
    "name": "Bouvet Island",
    "phonecode": "0",
    "image": "img.png",
    "embassy_email": null
}, {
    "id": 30,
    "code": "BR",
    "name": "Brazil",
    "phonecode": "55",
    "image": "Brazil.png",
    "embassy_email": "ambassador@indianembassy.org.br, cultural@indianembassy.org.br, reception@indianembassy.org.br"
}, {
    "id": 31,
    "code": "IO",
    "name": "British Indian Ocean Territory",
    "phonecode": "246",
    "image": "img.png",
    "embassy_email": null
}, {
    "id": 32,
    "code": "BN",
    "name": "Brunei Darussalam",
    "phonecode": "673",
    "image": "Brunei.png",
    "embassy_email": null
}, {
    "id": 33,
    "code": "BG",
    "name": "Bulgaria",
    "phonecode": "359",
    "image": "Bulgaria.png",
    "embassy_email": "hoc@indembsofia.org"
}, {
    "id": 34,
    "code": "BF",
    "name": "Burkina Faso",
    "phonecode": "226",
    "image": "Burkina Faso.png",
    "embassy_email": null
}, {
    "id": 35,
    "code": "BI",
    "name": "Burundi",
    "phonecode": "257",
    "image": "Burundi.png",
    "embassy_email": "hoc.kampalamea.gov.in, hc.kampalamea.gov.in"
}, {
    "id": 36,
    "code": "KH",
    "name": "Cambodia",
    "phonecode": "855",
    "image": "Cambodja.png",
    "embassy_email": "embindia@online.com.kh, amb.phnompenh@mea.gov.in"
}, {
    "id": 37,
    "code": "CM",
    "name": "Cameroon",
    "phonecode": "237",
    "image": "Cameroon.png",
    "embassy_email": "ravidouala@yahoo.com"
}, {
    "id": 38,
    "code": "CA",
    "name": "Canada",
    "phonecode": "1",
    "image": "Canada.png",
    "embassy_email": "cgindia@cgitoronto.ca,indiacg@telus.net, consular@hciottawa.ca, hicomind@hciottawa.ca, hoc@hciottawa.ca"
}, {
    "id": 39,
    "code": "CV",
    "name": "Cape Verde",
    "phonecode": "238",
    "image": "Cape Verde.png",
    "embassy_email": null
}, {
    "id": 40,
    "code": "KY",
    "name": "Cayman Islands",
    "phonecode": "1345",
    "image": "Cayman Islands.png",
    "embassy_email": null
}, {
    "id": 41,
    "code": "CF",
    "name": "Central African Republic",
    "phonecode": "236",
    "image": "Central African Republic.png",
    "embassy_email": null
}, {
    "id": 42,
    "code": "TD",
    "name": "Chad",
    "phonecode": "235",
    "image": "Chad.png",
    "embassy_email": "Tv2000@intnet.td, nassirarzamkhan@yahoo.co.uk"
}, {
    "id": 43,
    "code": "CL",
    "name": "Chile",
    "phonecode": "56",
    "image": "Chile.png",
    "embassy_email": "info@embajadaindia.cl"
}, {
    "id": 44,
    "code": "CN",
    "name": "China",
    "phonecode": "86",
    "image": "China.png",
    "embassy_email": "cg.hongkong@mea.gov.in, hoc.beijing@mea.gov.in, amboff@indianembassy.org.cn, dcm@indianembassy.org.cn"
}, {
    "id": 45,
    "code": "CX",
    "name": "Christmas Island",
    "phonecode": "61",
    "image": "img.png",
    "embassy_email": null
}, {
    "id": 46,
    "code": "CC",
    "name": "Cocos (Keeling) Islands",
    "phonecode": "672",
    "image": "img.png",
    "embassy_email": null
}, {
    "id": 47,
    "code": "CO",
    "name": "Colombia",
    "phonecode": "57",
    "image": "Colombia.png",
    "embassy_email": "consular@embajadaindia.org,  social@embajadaindia.org"
}, {
    "id": 48,
    "code": "KM",
    "name": "Comoros",
    "phonecode": "269",
    "image": "Comoros.png",
    "embassy_email": "amb.aanarivo@mea.gov.in,indesecamb@blueline.mg"
}, {
    "id": 49,
    "code": "CG",
    "name": "Congo",
    "phonecode": "242",
    "image": "Congo.png",
    "embassy_email": null
}, {
    "id": 50,
    "code": "CK",
    "name": "Cook Islands",
    "phonecode": "682",
    "image": "Cook Islands.png",
    "embassy_email": null
}, {
    "id": 51,
    "code": "CR",
    "name": "Costa Rica",
    "phonecode": "506",
    "image": "Costa Rica.png",
    "embassy_email": null
}, {
    "id": 52,
    "code": "HR",
    "name": "Croatia (Hrvatska)",
    "phonecode": "385",
    "image": "Croatia.png",
    "embassy_email": "hoc@indianembassy.hr, hoc@indianembassy.hr, info@indianembassy.hr"
}, {
    "id": 53,
    "code": "CU",
    "name": "Cuba",
    "phonecode": "53",
    "image": "Cuba.png",
    "embassy_email": "embindembassyhavana.cu, amb.havana@mea.gov.in,  hoc.havana@mea.gov.in"
}, {
    "id": 54,
    "code": "CY",
    "name": "Cyprus",
    "phonecode": "357",
    "image": "Cyprus.png",
    "embassy_email": "hc.nicosia@mea.gov.in, hoc.nicosia@mea.gov.in,  hocoffice.nicosia@mea.gov.in"
}, {
    "id": 55,
    "code": "CZ",
    "name": "Czech Republic",
    "phonecode": "420",
    "image": "Czech Republic.png",
    "embassy_email": "consular@india.cz"
}, {
    "id": 56,
    "code": "DK",
    "name": "Denmark",
    "phonecode": "45",
    "image": "Denmark.png",
    "embassy_email": "visa@indian-embassy.dk"
}, {
    "id": 57,
    "code": "DJ",
    "name": "Djibouti",
    "phonecode": "253",
    "image": "Djibouti.png",
    "embassy_email": "hoc.addisababa@mea.gov.in, ops@kothari.dj, nalin@kothari.dj"
}, {
    "id": 58,
    "code": "DM",
    "name": "Dominica",
    "phonecode": "1767",
    "image": "Dominica.png",
    "embassy_email": null
}, {
    "id": 59,
    "code": "DO",
    "name": "Dominican Republic",
    "phonecode": "1809",
    "image": "Dominican Republic.png",
    "embassy_email": "consultora@autohaus.com.do"
}, {
    "id": 60,
    "code": "TP",
    "name": "East Timor",
    "phonecode": "670",
    "image": "Timor-Leste.png",
    "embassy_email": null
}, {
    "id": 61,
    "code": "EC",
    "name": "Ecuador",
    "phonecode": "593",
    "image": "Ecuador.png",
    "embassy_email": "consular@embajadaindia.org "
}, {
    "id": 62,
    "code": "EG",
    "name": "Egypt",
    "phonecode": "20",
    "image": "Egypt.png",
    "embassy_email": "embassy@indembcairo.com,hoc.cairo@mea.gov.in, amb.cairo@mea.gov.in, dcm.cairo@mea.gov.in,consulate@indembacairo.com"
}, {
    "id": 63,
    "code": "SV",
    "name": "El Salvador",
    "phonecode": "503",
    "image": "El Salvador.png",
    "embassy_email": null
}, {
    "id": 64,
    "code": "GQ",
    "name": "Equatorial Guinea",
    "phonecode": "240",
    "image": "Equatorial Guinea.png",
    "embassy_email": null
}, {
    "id": 65,
    "code": "ER",
    "name": "Eritrea",
    "phonecode": "291",
    "image": "Eritrea.png",
    "embassy_email": "couns.nairobi@mea.gov.in,com.nairobi@mea.gov.in,hoc.nairobi@mea.gov.in"
}, {
    "id": 66,
    "code": "EE",
    "name": "Estonia",
    "phonecode": "372",
    "image": "Estonia.png",
    "embassy_email": null
}, {
    "id": 67,
    "code": "ET",
    "name": "Ethiopia",
    "phonecode": "251",
    "image": "Ethiopia.png",
    "embassy_email": "hoc.addisababa@mea.gov.in, ops@kothari.dj, nalin@kothari.dj"
}, {
    "id": 68,
    "code": "FK",
    "name": "Falkland Islands (Malvinas)",
    "phonecode": "500",
    "image": "Falkland Islands.png",
    "embassy_email": null
}, {
    "id": 69,
    "code": "FO",
    "name": "Faroe Islands",
    "phonecode": "298",
    "image": "Faroes.png",
    "embassy_email": null
}, {
    "id": 70,
    "code": "FJ",
    "name": "Fiji",
    "phonecode": "679",
    "image": "Fiji.png",
    "embassy_email": "hc.suva@mea.gov.in, admn.suva@mea.gov.in"
}, {
    "id": 71,
    "code": "FI",
    "name": "Finland",
    "phonecode": "358",
    "image": "Finland.png",
    "embassy_email": "amb.helsinki@mea.gov.in, hoc.helsinki@mea.gov.in, cons.helsinki@mea.gov.in"
}, {
    "id": 72,
    "code": "FR",
    "name": "France",
    "phonecode": "33",
    "image": "France.png",
    "embassy_email": "hoc.paris@mea.gov.in, dcm.paris@mea.gov.in, cons.paris@mea.gov.in"
}, {
    "id": 73,
    "code": "FX",
    "name": "France, Metropolitan",
    "phonecode": null,
    "image": "img.png",
    "embassy_email": null
}, {
    "id": 74,
    "code": "GF",
    "name": "French Guiana",
    "phonecode": "594",
    "image": "France.png",
    "embassy_email": null
}, {
    "id": 75,
    "code": "PF",
    "name": "French Polynesia",
    "phonecode": "689",
    "image": "Tahiti(French Polinesia).png",
    "embassy_email": null
}, {
    "id": 76,
    "code": "TF",
    "name": "French Southern Territories",
    "phonecode": "0",
    "image": "img.png",
    "embassy_email": null
}, {
    "id": 77,
    "code": "GA",
    "name": "Gabon",
    "phonecode": "241",
    "image": "Gabon.png",
    "embassy_email": "indcongab@yahoo.fr"
}, {
    "id": 78,
    "code": "GM",
    "name": "Gambia",
    "phonecode": "220",
    "image": "Gambia.png",
    "embassy_email": "rammohan@gamtel.gm, indcongab@yahoo.fr, indcongab@hotmail.com"
}, {
    "id": 79,
    "code": "GE",
    "name": "Georgia",
    "phonecode": "995",
    "image": "Georgia.png",
    "embassy_email": "contact@indianconsulateatlanta.org, CONS.ATLANTA@MEA.GOV.IN, PASSPORT@INDIANCONSULATEATLANTA.ORG"
}, {
    "id": 80,
    "code": "DE",
    "name": "Germany",
    "phonecode": "49",
    "image": "Germany.png",
    "embassy_email": "ambassador@indiaembassy.de, consular@indianembassy.de, chancery@indianembassy.de"
}, {
    "id": 81,
    "code": "GH",
    "name": "Ghana",
    "phonecode": "233",
    "image": "Ghana.png",
    "embassy_email": "hoc.accra@mea.gov.in, hc.accra@mea.gov.in"
}, {
    "id": 82,
    "code": "GI",
    "name": "Gibraltar",
    "phonecode": "350",
    "image": "Gibraltar.png",
    "embassy_email": null
}, {
    "id": 83,
    "code": "GK",
    "name": "Guernsey",
    "phonecode": "1437",
    "image": "Guernsey.png",
    "embassy_email": null
}, {
    "id": 84,
    "code": "GR",
    "name": "Greece",
    "phonecode": "30",
    "image": "Greece.png",
    "embassy_email": "ambassador@indianembassy.gr,hoc@indianembassy.gr, visa@indianembassy.gr, consular@indianembassy.gr"
}, {
    "id": 85,
    "code": "GL",
    "name": "Greenland",
    "phonecode": "299",
    "image": "Greenland.png",
    "embassy_email": null
}, {
    "id": 86,
    "code": "GD",
    "name": "Grenada",
    "phonecode": "1473",
    "image": "Grenada.png",
    "embassy_email": "info@ambpv.com, highcommission@hcipos.in , fscons@hcipos.in"
}, {
    "id": 87,
    "code": "GP",
    "name": "Guadeloupe",
    "phonecode": "590",
    "image": "Guadeloupe.png",
    "embassy_email": null
}, {
    "id": 88,
    "code": "GU",
    "name": "Guam",
    "phonecode": "1671",
    "image": "Guam.png",
    "embassy_email": "info@ambpv.com"
}, {
    "id": 89,
    "code": "GT",
    "name": "Guatemala",
    "phonecode": "502",
    "image": "Guatemala.png",
    "embassy_email": "hoc.guatemala@mea.gov.in, cons.guatemala@mea.gov.in"
}, {
    "id": 90,
    "code": "GN",
    "name": "Guinea",
    "phonecode": "224",
    "image": "Guinea.png",
    "embassy_email": "accounts@topaz.com.gn"
}, {
    "id": 91,
    "code": "GW",
    "name": "Guinea-Bissau",
    "phonecode": "245",
    "image": "Guinea-Bissau.png",
    "embassy_email": null
}, {
    "id": 92,
    "code": "GY",
    "name": "Guyana",
    "phonecode": "592",
    "image": "Guyana.png",
    "embassy_email": "hc.georgetown@mea.gov.in,  hoc.georgetown@mea.gov.in,  cons.georgetown@mea.gov.in"
}, {
    "id": 93,
    "code": "HT",
    "name": "Haiti",
    "phonecode": "509",
    "image": "Haiti.png",
    "embassy_email": "handlfils33@aol.com"
}, {
    "id": 95,
    "code": "HN",
    "name": "Honduras",
    "phonecode": "504",
    "image": "Honduras.png",
    "embassy_email": "ceo@dromeinter.com, drom1@dromeinter"
}, {
    "id": 96,
    "code": "HK",
    "name": "Hong Kong",
    "phonecode": "852",
    "image": "Hong Kong.png",
    "embassy_email": "info.hk@blsinternational.net, ocipio@cgihk.gov.in"
}, {
    "id": 97,
    "code": "HU",
    "name": "Hungary",
    "phonecode": "36",
    "image": "Hungary.png",
    "embassy_email": "chancery@indianembassy.hu"
}, {
    "id": 98,
    "code": "IS",
    "name": "Iceland",
    "phonecode": "354",
    "image": "Iceland.png",
    "embassy_email": "amb@indianembassy.is, amb.reykjavik@mea.gov.in, hoc@indianembassy.in,hoc.reykjavik@mea.gov.in"
}, {
    "id": 99,
    "code": "IN",
    "name": "India",
    "phonecode": "91",
    "image": "India.png",
    "embassy_email": "pratik@edulab.in,namrata@edulab.in,namrata@edulab.in,namrata@edulab.in"
}, {
    "id": 100,
    "code": "IM",
    "name": "Isle of Man",
    "phonecode": "1580",
    "image": "Isle of Man.png",
    "embassy_email": null
}, {
    "id": 101,
    "code": "ID",
    "name": "Indonesia",
    "phonecode": "62",
    "image": "Indonezia.png",
    "embassy_email": "indambtel@indembassy.co.il, com.jakarta@mea.gov.in , dcm.jakarta@mea.gov.in, cons.jakarta@mea.gov.in"
}, {
    "id": 102,
    "code": "IR",
    "name": "Iran (Islamic Republic of)",
    "phonecode": "98",
    "image": "Iran.png",
    "embassy_email": "hoc.tehran@mea.gov.in, cons.tehran@mea.gov.in"
}, {
    "id": 103,
    "code": "IQ",
    "name": "Iraq",
    "phonecode": "964",
    "image": "Iraq.png",
    "embassy_email": "amb.baghdad@mea.gov.in, hoc.baghdad@mea.gov.in, adm.baghdad@mea.gov.in, cons.baghdad@mea.gov.in"
}, {
    "id": 104,
    "code": "IE",
    "name": "Ireland",
    "phonecode": "353",
    "image": "Ireland.png",
    "embassy_email": "cons.dublin@mea.gov.in"
}, {
    "id": 105,
    "code": "IL",
    "name": "Israel",
    "phonecode": "972",
    "image": "Israel.png",
    "embassy_email": "cons.telaviv@mea.gov.in, indambtel@indembassy.co.il, dcm.telaviv@mea.gov.in"
}, {
    "id": 106,
    "code": "IT",
    "name": "Italy",
    "phonecode": "39",
    "image": "Italy.png",
    "embassy_email": "gen.email@indianembassy.it, amb.office@indianembassy.it, cons.wing@indianembassy.it"
}, {
    "id": 107,
    "code": "CI",
    "name": "Ivory Coast",
    "phonecode": "225",
    "image": "Ivory Coast.png",
    "embassy_email": "amb.office@eoiabidjan.org, amb.abidjan@mea.gov.in, hoc.abidjan@mea.gov.in"
}, {
    "id": 108,
    "code": "JE",
    "name": "Jersey",
    "phonecode": "1490",
    "image": "Jersey.png",
    "embassy_email": null
}, {
    "id": 109,
    "code": "JM",
    "name": "Jamaica",
    "phonecode": "1876",
    "image": "Jamaica.png",
    "embassy_email": "hicomindkin@cwjamaica.com"
}, {
    "id": 110,
    "code": "JP",
    "name": "Japan",
    "phonecode": "81",
    "image": "Japan.png",
    "embassy_email": "ambassador@net_zap.com, embassy@indembassy-tokyo.gov.in"
}, {
    "id": 111,
    "code": "JO",
    "name": "Jordan",
    "phonecode": "962",
    "image": "Jordan.png",
    "embassy_email": "amb.amman@mea.gov.in, hoc.amman@mea.gov.in"
}, {
    "id": 112,
    "code": "KZ",
    "name": "Kazakhstan",
    "phonecode": "7",
    "image": "Kazakhstan.png",
    "embassy_email": "hoc.astana@mea.gov.in, amb.astana@mea.gov.in, cons.astana@mea.gov.in, cons.almaty@mea.gov.in"
}, {
    "id": 113,
    "code": "KE",
    "name": "Kenya",
    "phonecode": "254",
    "image": "Kenya.png",
    "embassy_email": "hcindia@kenyaweb.com, hc.nairobi@mea.gov.in, passportvisa@hcinairobi.co.ke, cons.nairobi@mea.gov.in"
}, {
    "id": 114,
    "code": "KI",
    "name": "Kiribati",
    "phonecode": "686",
    "image": "Kiribati.png",
    "embassy_email": null
}, {
    "id": 115,
    "code": "KP",
    "name": "Korea, Democratic People's Republic of",
    "phonecode": "850",
    "image": "img.png",
    "embassy_email": null
}, {
    "id": 116,
    "code": "KR",
    "name": "South Korea",
    "phonecode": "82",
    "image": "img.png",
    "embassy_email": null
}, {
    "id": 117,
    "code": "XK",
    "name": "Kosovo",
    "phonecode": "383",
    "image": "Kosovo.png",
    "embassy_email": null
}, {
    "id": 118,
    "code": "KW",
    "name": "Kuwait",
    "phonecode": "965",
    "image": "Kuwait.png",
    "embassy_email": "amboffice@indembkwt.org, ambss@indembkwt.org, counsellor@indembkwt.org, sscons@indembkwt.org, hoc@indembkwt.org"
}, {
    "id": 119,
    "code": "KG",
    "name": "Kyrgyzstan",
    "phonecode": "996",
    "image": "Kyrgyzstan.png",
    "embassy_email": "cons.bishkek@mea.gov.in, amb.bishkek@mea.gov.in, hoc.bishkek@mea.gov.in"
}, {
    "id": 120,
    "code": "LA",
    "name": "Lao People's Democratic Republic",
    "phonecode": "856",
    "image": "Laos.png",
    "embassy_email": "info@indianembassylaos.org, amb.vientianne@mea.gov.in, hoc.vientianne@mea.gov.in, cons.vientianne@mea.gov.in"
}, {
    "id": 121,
    "code": "LV",
    "name": "Latvia",
    "phonecode": "371",
    "image": "Latvia.png",
    "embassy_email": "cons.berne@mea.gov.in, hoc.berne@mea.gov.in"
}, {
    "id": 122,
    "code": "LB",
    "name": "Lebanon",
    "phonecode": "961",
    "image": "Lebanon.png",
    "embassy_email": "amb.beirut@mea.gov.in, hoc.beirut@mea.gov.in,  cons.beirut@mea.gov.in"
}, {
    "id": 123,
    "code": "LS",
    "name": "Lesotho",
    "phonecode": "266",
    "image": "Lesotho.png",
    "embassy_email": "hcilesotho@gmail.com"
}, {
    "id": 124,
    "code": "LR",
    "name": "Liberia",
    "phonecode": "231",
    "image": "Liberia.png",
    "embassy_email": "jeetytrading@awli.net, jeetytrading@yahoo.com, "
}, {
    "id": 125,
    "code": "LY",
    "name": "Libyan Arab Jamahiriya",
    "phonecode": "218",
    "image": "Libya.png",
    "embassy_email": "ambassador@indianembassy.ly, hoc.tripoli@mea.gov.in, consularvisa@indianembassy.ly"
}, {
    "id": 126,
    "code": "LI",
    "name": "Liechtenstein",
    "phonecode": "423",
    "image": "Liechtenshein.png",
    "embassy_email": "cons.berne@mea.gov.in, hoc.berne@mea.gov.in"
}, {
    "id": 127,
    "code": "LT",
    "name": "Lithuania",
    "phonecode": "370",
    "image": "Lithuania.png",
    "embassy_email": "indconsulate.lt@gmail.com, info@indianconsulate.lt,Rajinder.Chaudhary@yahoo.com"
}, {
    "id": 128,
    "code": "LU",
    "name": "Luxembourg",
    "phonecode": "352",
    "image": "Luxembourg.png",
    "embassy_email": "youbelex@telenet.be, consularservices@emdi.lu, hcg@emdi.lu"
}, {
    "id": 129,
    "code": "MO",
    "name": "Macau",
    "phonecode": "583",
    "image": "Macao.png",
    "embassy_email": null
}, {
    "id": 130,
    "code": "MK",
    "name": "Macedonia",
    "phonecode": "389",
    "image": "Macedonia.png",
    "embassy_email": "krste.isirov@kemofarm.com.mk"
}, {
    "id": 131,
    "code": "MG",
    "name": "Madagascar",
    "phonecode": "261",
    "image": "Madagascar.png",
    "embassy_email": "amb.aanarivo@mea.gov.in, hoc.aanarivo@mea.gov.in,  cons.aanarivo@mea.gov.in,  indconsular@blueline.mg"
}, {
    "id": 132,
    "code": "MW",
    "name": "Malawi",
    "phonecode": "265",
    "image": "Malawi.png",
    "embassy_email": "cons.malawi@mea.gov.in, receptionist@hcililongwe.org, adm.malawi@mea.gov.in"
}, {
    "id": 133,
    "code": "MY",
    "name": "Malaysia",
    "phonecode": "60",
    "image": "Malaysia.png",
    "embassy_email": "hc@indianhighcommission.com.my, attcons@indianhighcommission.com.my, info@indianhighcommission.com.my, admn@indianhighcommission.com.my"
}, {
    "id": 134,
    "code": "MV",
    "name": "Maldives",
    "phonecode": "960",
    "image": "Maldives.png",
    "embassy_email": "hcimale@hicomindia.com.mv, hc@hicomindia.com.mv, fs@hicomindia.com.mv,dhc.male@mea.gov.in"
}, {
    "id": 135,
    "code": "ML",
    "name": "Mali",
    "phonecode": "223",
    "image": "Mali.png",
    "embassy_email": "amb.bamako@mea.gov.in,  hoc.bamako@mea.gov.in,  cons.bamako@mea.gov.in"
}, {
    "id": 136,
    "code": "MT",
    "name": "Malta",
    "phonecode": "356",
    "image": "Malta.png",
    "embassy_email": "consular@india.org.mt,  info@india.org.mt"
}, {
    "id": 137,
    "code": "MH",
    "name": "Marshall Islands",
    "phonecode": "692",
    "image": "Marshall Islands.png",
    "embassy_email": "infotokyo@ivsglobal.in"
}, {
    "id": 138,
    "code": "MQ",
    "name": "Martinique",
    "phonecode": "596",
    "image": "Martinique.png",
    "embassy_email": null
}, {
    "id": 139,
    "code": "MR",
    "name": "Mauritania",
    "phonecode": "222",
    "image": "Mauritania.png",
    "embassy_email": null
}, {
    "id": 140,
    "code": "MU",
    "name": "Mauritius",
    "phonecode": "230",
    "image": "Mauritius.png",
    "embassy_email": "hicom.ss@intnet.mu"
}, {
    "id": 141,
    "code": "TY",
    "name": "Mayotte",
    "phonecode": "269",
    "image": "img.png",
    "embassy_email": null
}, {
    "id": 142,
    "code": "MX",
    "name": "Mexico",
    "phonecode": "52",
    "image": "Mexico.png",
    "embassy_email": "  secy_eoimex@prodigy.net.mx , pol.mexico@mea.gov.in &  cons.mexico@mea.gov.in, eoimex@prodigy.net.mx"
}, {
    "id": 143,
    "code": "FM",
    "name": "Micronesia, Federated States of",
    "phonecode": "691",
    "image": "Micronesia.png",
    "embassy_email": null
}, {
    "id": 144,
    "code": "MD",
    "name": "Moldova, Republic of",
    "phonecode": "373",
    "image": "Moldova.png",
    "embassy_email": null
}, {
    "id": 145,
    "code": "MC",
    "name": "Monaco",
    "phonecode": "377",
    "image": "Monaco.png",
    "embassy_email": "cons.paris@mea.gov.in"
}, {
    "id": 146,
    "code": "MN",
    "name": "Mongolia",
    "phonecode": "976",
    "image": "Mongolia.png",
    "embassy_email": "amb.ulaan@mea.gov.in,indembmongolia@magicnet.mn, cons.ulaan@mea.gov.in"
}, {
    "id": 147,
    "code": "ME",
    "name": "Montenegro",
    "phonecode": "382",
    "image": "Montenegro.png",
    "embassy_email": "emb.vienna@mea.gov.in"
}, {
    "id": 148,
    "code": "MS",
    "name": "Montserrat",
    "phonecode": "1664",
    "image": "Montserrat.png",
    "embassy_email": "highcommission@hcipos.in , fscons@hcipos.in"
}, {
    "id": 149,
    "code": "MA",
    "name": "Morocco",
    "phonecode": "212",
    "image": "Morocco.png",
    "embassy_email": "hoc.rabat@mea.gov.in, amb.rabat@mea.gov.in, cons.rabat@mea.gov.in"
}, {
    "id": 150,
    "code": "MZ",
    "name": "Mozambique",
    "phonecode": "258",
    "image": "Mozambique.png",
    "embassy_email": "hicomind@hciottawa.ca,hc@hciottawa.ca, hicomind@tvcabo.co.mz"
}, {
    "id": 151,
    "code": "MM",
    "name": "Myanmar",
    "phonecode": "95",
    "image": "Myanmar(Burma).png",
    "embassy_email": "socsecy@indiaembassy.net.mm"
}, {
    "id": 152,
    "code": "NA",
    "name": "Namibia",
    "phonecode": "264",
    "image": "Namibia.png",
    "embassy_email": "ambassador@embindia.org.zw, hcindia@mweb.com.na, hicomind@mweb.com.na, hciadmn@mweb.com.na"
}, {
    "id": 153,
    "code": "NR",
    "name": "Nauru",
    "phonecode": "674",
    "image": "Nauru.png",
    "embassy_email": null
}, {
    "id": 154,
    "code": "NP",
    "name": "Nepal",
    "phonecode": "977",
    "image": "Nepal.png",
    "embassy_email": "amb@eoiktm.org, hoc@eoiktm.org, dcm@eoiktm.org"
}, {
    "id": 155,
    "code": "NL",
    "name": "Netherlands",
    "phonecode": "31",
    "image": "Netherlands.png",
    "embassy_email": "ambassador@indianembassy.nl, hoc.thehague@mea.gov.in, admin.thehague@mea.gov.in"
}, {
    "id": 156,
    "code": "AN",
    "name": "Netherlands Antilles",
    "phonecode": "599",
    "image": "Netherlands Antilles.png",
    "embassy_email": null
}, {
    "id": 157,
    "code": "NC",
    "name": "New Caledonia",
    "phonecode": "687",
    "image": "New Caledonia.png",
    "embassy_email": null
}, {
    "id": 158,
    "code": "NZ",
    "name": "New Zealand",
    "phonecode": "64",
    "image": "New Zealand.png",
    "embassy_email": "Inquiries@hicomind.org.nz"
}, {
    "id": 159,
    "code": "NI",
    "name": "Nicaragua",
    "phonecode": "505",
    "image": "Nicaragua.png",
    "embassy_email": "alacayo@financo.us"
}, {
    "id": 160,
    "code": "NE",
    "name": "Niger",
    "phonecode": "227",
    "image": "Niger.png",
    "embassy_email": "hoc.niamey@mea.gov.in"
}, {
    "id": 161,
    "code": "NG",
    "name": "Nigeria",
    "phonecode": "234",
    "image": "Nigeria.png",
    "embassy_email": "Cons1.abuja@mea.gov.in, cons.abuja@mea.gov.in, hoc.abuja@mea.gov.in, Cons.visa@hcilagos.org,Cons.visa@hcilagos.org,cons.abuja@mea.gov.in"
}, {
    "id": 162,
    "code": "NU",
    "name": "Niue",
    "phonecode": "683",
    "image": "img.png",
    "embassy_email": null
}, {
    "id": 163,
    "code": "NF",
    "name": "Norfolk Island",
    "phonecode": "672",
    "image": "img.png",
    "embassy_email": null
}, {
    "id": 164,
    "code": "MP",
    "name": "Northern Mariana Islands",
    "phonecode": "1670",
    "image": "img.png",
    "embassy_email": null
}, {
    "id": 165,
    "code": "NO",
    "name": "Norway",
    "phonecode": "47",
    "image": "Norway.png",
    "embassy_email": "amb.oslo@mea.gov.in, hoc.oslo@mea.gov.in, consular@indemb.no"
}, {
    "id": 166,
    "code": "OM",
    "name": "Oman",
    "phonecode": "968",
    "image": "Oman.png",
    "embassy_email": "hom@indemb_oman.org, hoc.muscat@mea.gov.in, dcm@indemb-oman.org"
}, {
    "id": 167,
    "code": "PK",
    "name": "Pakistan",
    "phonecode": "92",
    "image": "Pakistan.png",
    "embassy_email": "visa.islamabad@mea.gov.in, cons.islamabad@mea.gov.in, cons2.islamabas@mea.gov.in"
}, {
    "id": 168,
    "code": "PW",
    "name": "Palau",
    "phonecode": "680",
    "image": "Palau.png",
    "embassy_email": "info@ambpv.com"
}, {
    "id": 169,
    "code": "PS",
    "name": "Palestine",
    "phonecode": "970",
    "image": "Palestine.png",
    "embassy_email": "roi@roiramallah.org, rep.ramallah@mea.gov.in, admin@roiramallah.org, consular@roiramallah.org"
}, {
    "id": 170,
    "code": "PA",
    "name": "Panama",
    "phonecode": "507",
    "image": "Panama.png",
    "embassy_email": "ambassador@indempan.org,  sscci@indempan.org, ,  attache@indempan.org"
}, {
    "id": 171,
    "code": "PG",
    "name": "Papua New Guinea",
    "phonecode": "675",
    "image": "Papua New Guinea.png",
    "embassy_email": "hc.pmoresby@mea.gov.in, hoc.pmoresby@mea.gov.in"
}, {
    "id": 172,
    "code": "PY",
    "name": "Paraguay",
    "phonecode": "595",
    "image": "Paraguay.png",
    "embassy_email": "jz@acisa.com.py, marcela.encina@acisa.com.py"
}, {
    "id": 173,
    "code": "PE",
    "name": "Peru",
    "phonecode": "51",
    "image": "Peru.png",
    "embassy_email": "hoc.lima@mea.gov.in"
}, {
    "id": 174,
    "code": "PH",
    "name": "Philippines",
    "phonecode": "63",
    "image": "Philippines.png",
    "embassy_email": "amb@indembassymanila.in, amboffice@indembassymanila.in, cons@indembassymanila.in"
}, {
    "id": 175,
    "code": "PN",
    "name": "Pitcairn",
    "phonecode": "0",
    "image": "img.png",
    "embassy_email": null
}, {
    "id": 176,
    "code": "PL",
    "name": "Poland",
    "phonecode": "48",
    "image": "Poland.png",
    "embassy_email": "ambassador.office@indemwarsaw.in, hoc.warsaw@mea.gov.in"
}, {
    "id": 177,
    "code": "PT",
    "name": "Portugal",
    "phonecode": "351",
    "image": "Portugal.png",
    "embassy_email": "consular@indembassy-libson.org, hoc.lisbon@mea.gov.in, amb.lisbon@mea.gov.in"
}, {
    "id": 178,
    "code": "PR",
    "name": "Puerto Rico",
    "phonecode": "1787",
    "image": "Puerto Rico.png",
    "embassy_email": "info@ambpv.com"
}, {
    "id": 179,
    "code": "QA",
    "name": "Qatar",
    "phonecode": "974",
    "image": "Qatar.png",
    "embassy_email": "ambassor@qatar.net.qa,amb.doha@mea.gov.in, cons.doha@mea.gov.in"
}, {
    "id": 180,
    "code": "RE",
    "name": "Reunion",
    "phonecode": "262",
    "image": "Reunion.png",
    "embassy_email": "hoc.reunion@mea.gov.in"
}, {
    "id": 181,
    "code": "RO",
    "name": "Romania",
    "phonecode": "40",
    "image": "Romania.png",
    "embassy_email": "amb.bucharest@mea.gov.in, hoc.bucharest@mea.gov.in"
}, {
    "id": 182,
    "code": "RU",
    "name": "Russian Federation",
    "phonecode": "70",
    "image": "Russian Federation.png",
    "embassy_email": "ambassador@indianembassy.ru, amb.moscow@mea.gov.in, hoc.moscow@mea.gov.in"
}, {
    "id": 183,
    "code": "RW",
    "name": "Rwanda",
    "phonecode": "250",
    "image": "Rwanda.png",
    "embassy_email": "hoc.kampala@mea.gov.in, consular@hcikampala.co.ug, pshc@hcikampala.co.ug"
}, {
    "id": 184,
    "code": "KN",
    "name": "Saint Kitts and Nevis",
    "phonecode": "1869",
    "image": "St Kitts & Nevis.png",
    "embassy_email": null
}, {
    "id": 185,
    "code": "LC",
    "name": "Saint Lucia",
    "phonecode": "1758",
    "image": "Saint Lucia.png",
    "embassy_email": "consul-india@candw.lc"
}, {
    "id": 186,
    "code": "VC",
    "name": "Saint Vincent and the Grenadines",
    "phonecode": "1784",
    "image": "St Vincent & the Grenadines.png",
    "embassy_email": null
}, {
    "id": 187,
    "code": "WS",
    "name": "Samoa",
    "phonecode": "684",
    "image": "Samoa.png",
    "embassy_email": "info@ambpv.com"
}, {
    "id": 188,
    "code": "SM",
    "name": "San Marino",
    "phonecode": "378",
    "image": "San Marino.png",
    "embassy_email": null
}, {
    "id": 189,
    "code": "ST",
    "name": "Sao Tome and Principe",
    "phonecode": "239",
    "image": "Sao Tome & Principe.png",
    "embassy_email": null
}, {
    "id": 190,
    "code": "SA",
    "name": "Saudi Arabia",
    "phonecode": "966",
    "image": "Saudi Arabia.png",
    "embassy_email": "wel.riyadh@mea.gov.in,cw@indianembassay.org.sa, amb.riyadh@mea.gov.in, cons.riyadh@mea.gov.in, hoc.riyadh@mea.gov.in"
}, {
    "id": 191,
    "code": "SN",
    "name": "Senegal",
    "phonecode": "221",
    "image": "Senegal.png",
    "embassy_email": "indiacouns@orange.sn,  indiacom@orange.sn,  consular@orange.sn"
}, {
    "id": 192,
    "code": "RS",
    "name": "Serbia",
    "phonecode": "381",
    "image": "Serbia(Yugoslavia).png",
    "embassy_email": "fsindemb@eunet.rs,  indemb@eunet.rs"
}, {
    "id": 193,
    "code": "SC",
    "name": "Seychelles",
    "phonecode": "248",
    "image": "Seychelles.png",
    "embassy_email": "hoc.kampala@mea.gov.in, hc.mahe@mea.gov.in, hoc.mahe@mea.gov.in"
}, {
    "id": 194,
    "code": "SL",
    "name": "Sierra Leone",
    "phonecode": "232",
    "image": "Sierra Leone.png",
    "embassy_email": "kanazad@hotmail.com, tcsfreetown@yahoo.com, harishagnani@yahoo.com"
}, {
    "id": 195,
    "code": "SG",
    "name": "Singapore",
    "phonecode": "65",
    "image": "Singapore.png",
    "embassy_email": "info@blsindia.sg"
}, {
    "id": 196,
    "code": "SK",
    "name": "Slovakia",
    "phonecode": "421",
    "image": "Slovakia.png",
    "embassy_email": "eindia@slovanet.sk, ambindia@slovanet.sk"
}, {
    "id": 197,
    "code": "SI",
    "name": "Slovenia",
    "phonecode": "386",
    "image": "Slovenia.png",
    "embassy_email": "hoc.ljubljana@mea.gov.in, cons.ljubljana@mea.gov.in"
}, {
    "id": 198,
    "code": "SB",
    "name": "Solomon Islands",
    "phonecode": "677",
    "image": "Solomon Islands.png",
    "embassy_email": null
}, {
    "id": 199,
    "code": "SO",
    "name": "Somalia",
    "phonecode": "252",
    "image": "Somalia.png",
    "embassy_email": "couns.nairobi@mea.gov.in"
}, {
    "id": 200,
    "code": "ZA",
    "name": "South Africa",
    "phonecode": "27",
    "image": "South Africa.png",
    "embassy_email": "indiahc@hicomind.co.za, indiahc@hicomind.co.za, polinf@hicomind.co.za"
}, {
    "id": 202,
    "code": "ES",
    "name": "Spain",
    "phonecode": "34",
    "image": "Spain.png",
    "embassy_email": "amb@embassyindia.es, fscons@embassyindia.es"
}, {
    "id": 203,
    "code": "LK",
    "name": "Sri Lanka",
    "phonecode": "94",
    "image": "Sri Lanka.png",
    "embassy_email": "hoc.colombo@mea.gov.in, hoc.colombo@mea.gov.in, cons.colombo@mea.gov.in, cons2.colombo@mea.gov.in"
}, {
    "id": 204,
    "code": "SH",
    "name": "St. Helena",
    "phonecode": "290",
    "image": "img.png",
    "embassy_email": null
}, {
    "id": 205,
    "code": "PM",
    "name": "St. Pierre and Miquelon",
    "phonecode": "508",
    "image": "img.png",
    "embassy_email": null
}, {
    "id": 206,
    "code": "NS",
    "name": "North Sudan",
    "phonecode": "249",
    "image": "Sudan.png",
    "embassy_email": "ambassador@eoikhartoum.in, amb.khartoum@mea.gov.in, cons.khartoum@mea.gov.in, hoc.khartoum@mea.gov.in"
}, {
    "id": 207,
    "code": "SR",
    "name": "Suriname",
    "phonecode": "597",
    "image": "Suriname.png",
    "embassy_email": "india@sr.net"
}, {
    "id": 208,
    "code": "SJ",
    "name": "Svalbard and Jan Mayen Islands",
    "phonecode": "47",
    "image": "img.png",
    "embassy_email": null
}, {
    "id": 209,
    "code": "SZ",
    "name": "Swaziland",
    "phonecode": "268",
    "image": "Swaziland.png",
    "embassy_email": "hicomind@tvcabo.co.mz"
}, {
    "id": 210,
    "code": "SE",
    "name": "Sweden",
    "phonecode": "46",
    "image": "Sweden.png",
    "embassy_email": "ambassador@indianembassy.se, amb.stockholm@mea.gov.in, hoc.stockholm@mea.gov.in"
}, {
    "id": 211,
    "code": "CH",
    "name": "Switzerland",
    "phonecode": "41",
    "image": "Switzerland.png",
    "embassy_email": "cons.berne@mea.gov.in, hoc.berne@mea.gov.in"
}, {
    "id": 212,
    "code": "SY",
    "name": "Syrian Arab Republic",
    "phonecode": "963",
    "image": "Syria.png",
    "embassy_email": "cons.damascus@mea.gov.in , info@indianembassy.sy"
}, {
    "id": 213,
    "code": "TW",
    "name": "Taiwan",
    "phonecode": "886",
    "image": "Taiwan.png",
    "embassy_email": "visa@india.org.tw, it@india.org.tw, dg@india.org.tw"
}, {
    "id": 214,
    "code": "TJ",
    "name": "Tajikistan",
    "phonecode": "992",
    "image": "Tajikistan.png",
    "embassy_email": "info.dushanbe@mea.gov.in, cons.dushanbe@mea.gov.in, hoc.dushanbe@mea.gov.in, amb.dushanbe@mea.gov.in"
}, {
    "id": 215,
    "code": "TZ",
    "name": "Tanzania, United Republic of",
    "phonecode": "255",
    "image": "Tanzania.png",
    "embassy_email": "hci@hcindiatz.org, hc.desalaam@mea.gov.in, comm.desalaam@mea.gov.in"
}, {
    "id": 216,
    "code": "TH",
    "name": "Thailand",
    "phonecode": "66",
    "image": "Thailand.png",
    "embassy_email": "indiaemb@indianembassy.in.th"
}, {
    "id": 217,
    "code": "TG",
    "name": "Togo",
    "phonecode": "228",
    "image": "Togo.png",
    "embassy_email": "lalwanirp@hotmail.com"
}, {
    "id": 218,
    "code": "TK",
    "name": "Tokelau",
    "phonecode": "690",
    "image": "img.png",
    "embassy_email": null
}, {
    "id": 219,
    "code": "TO",
    "name": "Tonga",
    "phonecode": "676",
    "image": "Tonga.png",
    "embassy_email": "sspol@hicomind.co.za"
}, {
    "id": 220,
    "code": "TT",
    "name": "Trinidad and Tobago",
    "phonecode": "1868",
    "image": "Trinidad & Tobago.png",
    "embassy_email": "highcommission@hcipos.in , fscons@hcipos.in"
}, {
    "id": 221,
    "code": "TN",
    "name": "Tunisia",
    "phonecode": "216",
    "image": "Tunisia.png",
    "embassy_email": "amb.tunis@mea.gov.in, hoc.tunis@mea.gov.in, com.tunis@mea.gov.in"
}, {
    "id": 222,
    "code": "TR",
    "name": "Turkey",
    "phonecode": "90",
    "image": "Turkey.png",
    "embassy_email": "com@cgiistanbul.org, chancery@indembassy.org.tr"
}, {
    "id": 223,
    "code": "TM",
    "name": "Turkmenistan",
    "phonecode": "7370",
    "image": "Turkmenistan.png",
    "embassy_email": "hoc.ashgabat@mea.gov.in"
}, {
    "id": 224,
    "code": "TC",
    "name": "Turks and Caicos Islands",
    "phonecode": "1649",
    "image": "Turks and Caicos Islands.png",
    "embassy_email": null
}, {
    "id": 225,
    "code": "TV",
    "name": "Tuvalu",
    "phonecode": "688",
    "image": "Tuvalu.png",
    "embassy_email": "tuvaluconsulateindia@gmail.com"
}, {
    "id": 226,
    "code": "UG",
    "name": "Uganda",
    "phonecode": "256",
    "image": "Uganda.png",
    "embassy_email": "hoc.mahe@mea.gov.in, hoc.kampala@mea.gov.in, consular@hcikampala.co.ug, pshc@hcikampala.co.ug"
}, {
    "id": 227,
    "code": "UA",
    "name": "Ukraine",
    "phonecode": "380",
    "image": "Ukraine.png",
    "embassy_email": "pol.kyiv@mea.gov.in, cons.kyiv@mea.gov.in, cons1.kyiv@mea.gov.in, eoikmail@gmail.com"
}, {
    "id": 228,
    "code": "AE",
    "name": "United Arab Emirates",
    "phonecode": "971",
    "image": "United Arab Emirates.png",
    "embassy_email": "amboffice@indembassyuae.org, consular1@indembassyuae.org, hoc@indembassyuae.rog"
}, {
    "id": 229,
    "code": "GB",
    "name": "United Kingdom",
    "phonecode": "44",
    "image": "United Kingdom(Great Britain).png",
    "embassy_email": "hoc.birmingham@mea.gov.in,indianconsulate.scotland@btconnect.com, hoc.london@mea.gov.in, hc.office@hcilondon.in, dhc.office@hcilondon.in"
}, {
    "id": 230,
    "code": "US",
    "name": "United States",
    "phonecode": "1",
    "image": "United Nations.png",
    "embassy_email": "cci@indianconsulate.com,cg@indiacgny.org,cg@cgisf.org,consulgenhouston@swbell.net, cg@indiacgny.org, cg@indiacgny.org, hoc.washington@mea.gov.in,indemwash@indiagov.org"
}, {
    "id": 231,
    "code": "UM",
    "name": "United States minor outlying islands",
    "phonecode": "1",
    "image": "United States of America(USA).png",
    "embassy_email": null
}, {
    "id": 232,
    "code": "UY",
    "name": "Uruguay",
    "phonecode": "598",
    "image": "Uruguay.png",
    "embassy_email": "consular@indembarg.org.ar, frontdesk@indembarg.org.ar,  psamb@indembarg.org.ar "
}, {
    "id": 233,
    "code": "UZ",
    "name": "Uzbekistan",
    "phonecode": "998",
    "image": "Uzbekistan.png",
    "embassy_email": "amb.tashkent@mea.govt.in"
}, {
    "id": 234,
    "code": "VU",
    "name": "Vanuatu",
    "phonecode": "678",
    "image": "Vanutau.png",
    "embassy_email": null
}, {
    "id": 235,
    "code": "VA",
    "name": "Vatican City State",
    "phonecode": "379",
    "image": "Vatican City.png",
    "embassy_email": null
}, {
    "id": 236,
    "code": "VE",
    "name": "Venezuela",
    "phonecode": "58",
    "image": "Venezuela.png",
    "embassy_email": "info@embindia.org"
}, {
    "id": 237,
    "code": "VN",
    "name": "Vietnam",
    "phonecode": "84",
    "image": "Viet Nam.png",
    "embassy_email": "admin@indembassy.com.vn, amb.hanoi@mea.gov.in, hoc.hanoi@mea.gov.in, cons.hanoi@mea.gov.in"
}, {
    "id": 238,
    "code": "VG",
    "name": "Virgin Islands (British)",
    "phonecode": "283",
    "image": "Virgin Islands British.png",
    "embassy_email": null
}, {
    "id": 239,
    "code": "VI",
    "name": "Virgin Islands (U.S.)",
    "phonecode": "339",
    "image": "Virgin Islands US.png",
    "embassy_email": null
}, {
    "id": 240,
    "code": "WF",
    "name": "Wallis and Futuna Islands",
    "phonecode": "681",
    "image": "Wales.png",
    "embassy_email": null
}, {
    "id": 241,
    "code": "EH",
    "name": "Western Sahara",
    "phonecode": "212",
    "image": "Western Sahara.png",
    "embassy_email": null
}, {
    "id": 242,
    "code": "YE",
    "name": "Yemen",
    "phonecode": "967",
    "image": "Yemen.png",
    "embassy_email": "amb.sanaa@mea.gov.in, hoc.sanaa@mea.gov.in, attache@eoisanaa.org, consular@eoisanaa.org"
}, {
    "id": 245,
    "code": "ZM",
    "name": "Zambia",
    "phonecode": "260",
    "image": "Zambia.png",
    "embassy_email": "hc.office@hcilondon.in, hc.lusaka@mea.gov.in, cons.lusaka@mea.gov.in"
}, {
    "id": 246,
    "code": "ZW",
    "name": "Zimbabwe",
    "phonecode": "263",
    "image": "Zimbabwe.png",
    "embassy_email": "hicomind@afol.com.na, ambassador@embindia.org.zw, attache.cons@embindia.org.zw, attache.admn@embindia.org.zw"
}, {
    "id": 247,
    "code": "SS",
    "name": "South Sudan",
    "phonecode": "211",
    "image": "Sudan.png",
    "embassy_email": ""
}]

  getData() {
    return this.data;
  }
}
