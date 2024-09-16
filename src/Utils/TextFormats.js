const TextFormats = {
    price: "Price",
    content: "Content",
    devices: "Devices",
    freetrail: "Free Trail",
    cancelanytime: "Cancel Anytime",
    hdr: "HDR",
    dolbyatmos: "Dolby Atmos",
    adfree: "Ad-Free",
    offlineviewing: "Offline Viewing",
    familysharing: "Family Sharing",
    basic: "Basic",
    standard: "Standard",
    premium: "Premium"
}

const GetLabel = (actualText) => {
    return TextFormats[actualText.toLowerCase().replace(/ /g, "")];
}

export default GetLabel;