import "./styles.css";
import { useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

import List from "./List";

const supabase = createClient(
    "https://agnyesdxzgsszjbvwekd.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbnllc2R4emdzc3pqYnZ3ZWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NTY1NTIsImV4cCI6MjAxNzUzMjU1Mn0.EB8MdBUJcRbnLLE5TnOhsVbHQD3FHPnE3a-DlDG9jhw"
);

export default function AddProduct() {
    async function insertRow(event) {
        event.preventDefault();
        const { data, error } = await supabase
            .from("Rows")
            .insert([
                {
                    user: userRef.current.value,
                    magazine: magazineRef.current.value,
                    location: locationRef.current.value,
                    product_id: productIdRef.current.value,
                    product_name: productName,
                    amount: amountRef.current.value,
                },
            ])
            .select();
        productIdRef.current.value = "";
        amountRef.current.value = "";
        productIdRef.current.focus();
        setProductName("");
    }

    async function getProduct() {
        let { data: Items, error } = await supabase
            .from("Items")
            .select("*")
            .eq("product_id", productIdRef.current.value);
        setProductName(Items?.[0]?.name);
        if (!isNaN(Items?.[0]?.amount)) {
            amountRef.current.value = Items?.[0]?.amount;
        }
    }

    const [productName, setProductName] = useState("");
    const [user, setUser] = useState("Roman Lewandowski");
    const [tab, setTab] = useState(1);

    const userRef = useRef();
    const magazineRef = useRef();
    const productIdRef = useRef();
    const amountRef = useRef();
    const locationRef = useRef();

    return (
        <form onSubmit={insertRow}>

            <div className={"tab" + (tab === 1 ? " is-active" : "")} onClick={() => setTab(1)}>Dane</div>
            <div className={"tab" + (tab === 2 ? " is-active" : "")} onClick={() => setTab(2)}>Skanuj produkt</div>
            <div className={"tab" + (tab === 3 ? " is-active" : "")} onClick={() => setTab(3)}>Lista towarów</div>

            <div className={"tab-panel" + (tab === 1 ? " is-active" : "")}>
                <h1 onClick={getProduct}>Dane</h1>
                <div className="label">Użytkownik</div>
                <select ref={userRef} onChange={() => setUser(userRef.current.value)}>
                    <option>Roman Lewandowski</option>
                    <option>Marek Słodkowski</option>
                    <option>Bartłomiej Karólski</option>
                    <option>Jacek Zieliński</option>
                    <option>Sebastian Kopczyński</option>
                    <option>Dawid Krzykowski</option>
                    <option>Anna Kremska</option>
                    <option>Małgorzata Idźkowska</option>
                    <option>Danuta Duchna</option>
                    <option>Anna Kozicka</option>
                    <option>Kamil Pepłowski</option>
                    <option>Jacek Duchna</option>
                    <option>Igor Stypik</option>
                    <option>Beata Batyra</option>
                    <option>Marek Micigolski</option>
                    <option>Mariusz Hohmann</option>
                    <option>Iwona Gajocha</option>
                    <option>Marcin Szwed</option>
                    <option>Jakub Samojluk</option>
                </select>
                <div style={{ height: "24px" }}></div>

                <div className="label">Magazyn</div>
                <select ref={magazineRef}>
                    <option>M70 NIDZICA SKLEP</option>
                    <option>MRNI NIDZICA MAGAZYN REKLAMACYJNY</option>
                    <option>M60 DOBRE MIASTO SKLEP</option>
                    <option>MRDM DOBRE MIASTO MAGAZYN REKLAMACYJNY</option>
                    <option>M90 DZIAŁDOWO SKLEP</option>
                    <option>MRDZ DZIAŁDOWO MAGAZYN REKLAMACYJNY</option>
                    <option>M08 LIDZBARK WARMIŃSKI SKLEP</option>
                    <option>M88 LIDZBARK MAGAZYN MATERIAŁÓW BUDOWLANYCH</option>
                    <option>MRLW LIDZBARK WARMIŃSK MAGAZYN REKLAMACYJNY</option>
                    <option>M40 MORĄG SKLEP</option>
                    <option>MRMO MORĄG MAGAZYN REKLAMACYJNY</option>
                    <option>M01 OLSZTYN SKLEP</option>
                    <option>M02 OLSZTYN MAGAZYN MATERIAŁÓW BUDOWLANYCH</option>
                    <option>M03 OLSZTYN EXPORT</option>
                    <option>M04 OLSZTYN MAGAZYN TRANZYTOWY</option>
                    <option>M05 OLSZTYN MAGAZYN NR 5</option>
                    <option>M06 OLSZTYN MAGAZYN NR 6</option>
                    <option>M07 OLSZTYN MAGAZYN NA TOWARY SEZONOWE</option>
                    <option>M12 OLSZTYN SPRZEDAŻ INTERNETOWA</option>
                    <option>M13 OLSZTYN MAGAZYN VAN</option>
                    <option>M14 OLSZTYN MAGAZYN DEPOZYTOWY</option>
                    <option>M99 OLSZTYN MAGAZYN DZIAŁU ZAOPATRZENIA</option>
                    <option>MROL OLSZTYN MAGAZYN REKLAMACYJNY</option>
                    <option>M09 OSTRÓDA SKLEP</option>
                    <option>M10 OSTRÓDA DODATKOWY</option>
                    <option>MROS OSTRÓDA MAGAZYN REKLAMACYJNY</option>
                </select>
                <div style={{ height: "24px" }}></div>

                <div className="label">Sekcja</div>
                <select ref={locationRef}>
                    <option>1 – Nasiona , Nawozy , Łopaty do Śniegu</option>
                    <option>2, 3  - Broil King , Grile</option>
                    <option>4 – Energ. Lustra , Neo , Tesa , Favorite , Podkładki Filcowe</option>
                    <option>5 - Kasa, Klamki, Taczki</option>
                    <option>6 - Miary, Energia Batony, Rękawice, Cała Reszta</option>
                    <option>7 - Szafki, Umywalki, Zestawy Podtynkowe, Czysta Lazienka</option>
                    <option>8 - Lustra, Akcesoria Łazienkowe, Bisk</option>
                    <option>9 - Uchwyty, Węże, Słuchawki</option>
                    <option>10 - Baterie, Deszczownice</option>
                    <option>11 - Wanny, Umywalki, Kompakty, Zlewy, Odpływy Liniowe, Zawory, DEDRA Akcesoria</option>
                    <option>12 - Lada – Hydraulika</option>
                    <option>13 - Narzędzia AEG, TRYTON, DEWALT, DEDRA</option>
                    <option>14 - LOB</option>
                    <option>15 - BORYSZEW</option>
                    <option>16 - OC</option>
                    <option>17 - Miedź, Mosiądz</option>
                    <option>18 - Zawory</option>
                    <option>19 - Uszczelki, Węże, Syfony</option>
                    <option>20 - Koelner, Fisher</option>
                    <option>21 - Śruby, Nakrętki, Podkładki</option>
                    <option>22 - Kotwy, Gwoździe</option>
                    <option>23 - KW, KZ, PE</option>
                    <option>24 - Wyspa – Sprzęt Elektr.</option>
                    <option>25 - Kanalizacja, Kolanka, Rurki</option>
                    <option>26 - Kołki</option>
                    <option>27 - Wkręty</option>
                    <option>28 - Rawplug</option>
                    <option>29 - Kazimierczak</option>
                    <option>30 - Vidaron</option>
                    <option>31 - Altaxy, Decora Listwy</option>
                    <option>32 - Plandeki</option>
                    <option>33 - Drabiny, Pręty</option>
                    <option>34 - Narożniki</option>
                    <option>35 - Papier Ścierny</option>
                    <option>36 - GAH 1</option>
                    <option>37 - GAH 2</option>
                    <option>38 - ShopLine, Skrzynki</option>
                    <option>39 - Żarówki</option>
                    <option>40 - Przedłużacze, Gniazdka, Włączniki</option>
                    <option>41 - Przew. Elektryczne</option>
                    <option>42 - Łańcuchy, Linki</option>
                    <option>43 - Listwy Wentylac., Korytka, Uszczelki, Rury</option>
                    <option>44 - Wentylacja DOSPEL, AVENTA, Wentylatory</option>
                    <option>45 - Opaski, Uchwyty, Halogeny, Dzwonki, Wtyczki</option>
                    <option>46 - Wiertła</option>
                    <option>47 - Rączki, Wałki, Pędzle, Kuwety</option>
                    <option>48 - Taśmy, Folie</option>
                    <option>49 - Szczotki, Pace, Krzyżyki</option>
                    <option>50 - Poziomice, Piły</option>
                    <option>51 - Dłuta, Zszywacze, Siekiery, Młotki</option>
                    <option>52 - Wkrętaki, Szczypce</option>
                    <option>53 - Szczotki, Tarcze</option>
                    <option>54, 55 - Kubala 1, Kubala 2</option>
                    <option>56 - Rolety</option>
                    <option>57 - Decora (Listwy i Zakończenia)</option>
                    <option>58 - Profile</option>
                    <option>59 - Silicony Bostik, Ceresit</option>
                    <option>60 - Fugi</option>
                    <option>61 - Miary, Kątowniki</option>
                    <option>62 - Sadolin, Vidaron, Altax Imp.</option>
                    <option>63 - Podkłady, Folie, Wałki</option>
                    <option>64 - Panele</option>
                    <option>65 - Kosz – Wyprzedaże, Kubala, Słoiki</option>
                    <option>66 - Przedłużacze, Agregaty, Koła, Dedra, Grabie, Łopaty, Trzonki</option>
                    <option>67 - Wystawka – Szafki</option>
                    <option>68 - Wyspa, Grzejniki, Piecyki</option>
                    <option>69 - Samochodówka</option>
                    <option>70 - Ravi, York, Jan Nidezbędny</option>
                    <option>71 - Chemia, Ravi</option>
                    <option>72 - Chemia</option>
                    <option>73 - Brovin</option>
                    <option>74 - Forte Mill, Serwetki</option>
                    <option>75 - Bross, Biopon, Morus, Feniks, Płyny, Drzwi, Pojemniki</option>
                    <option>76 - Wędkarski, Wyspa Wędki, Chodaki, Gumofilce</option>
                    <option>77 - Dywany, Ceraty, Sympatex</option>
                    <option>78 - Art. Świąteczne, EkoGroszek</option>
                    <option>79 - Formy Do Ciast, Maty, Torebki, Serwetki</option>
                    <option>80 - Ambition, Porcelana, Kubki</option>
                    <option>81 - Ambition, Szkło, Noże, Garnki</option>
                    <option>82 - Ręczniki, Poduszki</option>
                    <option>83 - Chodaki, Dywany, Wycieraczki</option>
                    <option>84 - Patelnie – Royal, Ambition, Zwieger – Garnki, Czajniki</option>
                    <option>85 - Suszarki, Kosze, Miski</option>
                    <option>86 - Galicja Platiki, Szkło</option>
                    <option>87 - Garnki Art. Kuchenne</option>
                    <option>88 - Ambition Formy, Pojemniki Dzbanki, Czajniki</option>
                    <option>89 - Galicja Kubki, Dzbanki</option>
                    <option>90 - Ravi – artykuły, Worki, Blaszki, Jednorazówki</option>
                    <option>91 - Stol-Kar, Kleje do Tapet</option>
                    <option>92 - Płytki, Gress, Tapety, Worki</option>
                    <option>93 - BHP – Ostrz. Kurtki, Bluzy, Koszule</option>
                    <option>94 - BHP – Spodnie, Płaszcze, Koszulki</option>
                    <option>95 - Gondola 2</option>
                    <option>96 - Gondola 1</option>
                    <option>97 - BHP – Obuwie</option>
                    <option>99 - Sadolin, Dulux</option>
                    <option>100 - Grunty, Rozpuszczalniki</option>
                    <option>101 - SYPKIE, Kleje</option>
                    <option>102 - Izohan, Wiadra, Kasty</option>
                    <option>103 - Piachy, Tektura</option>
                    <option>104 - Szczotki, Grunty, Stretch</option>
                    <option>105 - Magnat C, Magnat KL</option>
                    <option>106 - Śnież. Plamoodporna, Jedynka</option>
                    <option>107 - Tikurilla, Brokaty, Zapasy</option>
                    <option>108 - Koloranty, Cementy, Goldband</option>
                    <option>109 - Dorex, Farby, Podesty</option>
                    <option>110 - Piachy, Farby</option>
                    <option>111 - Beckers</option>
                    <option>112 - Dębica</option>
                    <option>113 - Śnieżka – Olejne</option>
                    <option>114 - Śnieżka - BN</option>
                    <option>115 - Piachy Foveo</option>
                    <option>116 - Gwoździe, Taśmy, Farby</option>
                    <option>117 - Gwoździe, Pręty, Tynki, Farby</option>
                    <option>118 - Narożniki</option>
                    <option>119 - Drzwi, Folie, Drabiny, Podkłady</option>
                </select>
                <div style={{ height: "24px" }}></div>
            </div>


            <div className={"tab-panel" + (tab === 2 ? " is-active" : "")}>
                <h1 onClick={getProduct}>Skanuj produkt</h1>
                <div className="label">Produkt</div>
                <input ref={productIdRef} onChange={getProduct} />
                <p>{productName}</p>
                <div style={{ height: "24px" }}></div>

                <div className="label">Ilość</div>
                <input type="number" step="any" ref={amountRef} />
                <div style={{ height: "24px" }}></div>

                <button>Dodaj</button>
            </div>

            <div className={"tab-panel" + (tab === 3 ? " is-active" : "")}>
                <List user={user} tab={tab} />
            </div>


        </form>
    );
}
