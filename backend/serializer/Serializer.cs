//public abstract class Address
//{
//    public string City {get; set;} // Stockholm
//    public string Street {get; set;} // Storgatan 1
//    public int ZipCode {get; set;} // 12345
//}

//public class RecipientData : Address
//{
//    public string Name { get; set; } // Missionskyrkan
//}

//public class ShopData : Address
//{
//    public string BrandName { get; set; } // Lidl
//    public string ShopName {get; set; } // Lidl at Storgatan
//}

///**
//PoC class for deserializing json data. I.e. "transform" a raw string containing json data
//into an object representation (of multiple different types)
//*/
//public class Deserializer{

//    public void logAddress(Address a)
//    {
//        Console.WriteLine("City: " + a.City);
//        Console.WriteLine("Street: " + a.Street);
//        Console.WriteLine("Zip code: " + a.ZipCode);
//    }
//    public void deserializeRecipient(string rawData)
//    {
//        RecipientData recipientData = DeserializeFromJson<RecipientData>(rawData);
//        Console.WriteLine("Name: " + location.Name);
//        logAddress(recipientData);
//    }
//    public void deserializeShop(string rawData)
//    {
//        ShopData shopData = DeserializeFromJson<ShopDataData>(rawData);
//        Console.WriteLine("Address: " + shopData.Address);
//        Console.WriteLine("Brand name: " + shopData.BrandName);
//        Console.WriteLine("Name: " + shopData.BrandName + " on " + shopData.Address.Split(" ")[0]);
//        logAddress(shopData);
//    }

//    static T DeserializeFromJson<T>(string jsonContent)
//    {
//        return JsonConvert.DeserializeObject<T>(jsonContent);
//    }
//}
