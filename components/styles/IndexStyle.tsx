import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 20, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginBottom: 10 },
  logo: { width: 100, height: 50, resizeMode: "contain" },

  searchContainer: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20 },
  input: { 
    flex: 1, 
    height: 40, 
    borderColor: "gray", 
    borderWidth: 1, 
    marginHorizontal: 5, 
    marginBottom: 10, 
    paddingHorizontal: 10, 
    borderRadius: 8 
  },
  categoryContainer: { height: 50, marginBottom: 10 },
  categoryList: { flexDirection: "row", alignItems: "center", flexGrow: 1, paddingHorizontal: 10 },
  filterButton: { 
    paddingVertical: 8, 
    paddingHorizontal: 14, 
    marginRight: 6, 
    borderRadius: 12, 
    backgroundColor: "#eee", 
    minWidth: 90, 
    alignItems: "center",
  },
  selectedButton: { backgroundColor: "#ff6347" },
  filterText: { fontSize: 14, color: "#333", textAlign: "center" },
  selectedText: { color: "#fff", fontWeight: "bold" },
  buffetList: { paddingHorizontal: 10, paddingTop: 10 },
  card: {
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: 10,
  },
  image: { 
    width: "100%", 
    height: 180, 
    justifyContent: "flex-end" 
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buffetName: { fontSize: 18, fontWeight: "bold", color: "#fff", textAlign: "center" },
  buffetDetails: { fontSize: 14, color: "#ddd", textAlign: "center" },
  restaurantList: { 
    backgroundColor: "#fff", 
    padding: 20, 
    position: "absolute", 
    bottom: 0, 
    width: "100%", 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    shadowColor: "#000", 
    shadowOpacity: 0.2, 
    shadowRadius: 5, 
    elevation: 5,
  },
  restaurantText: { fontSize: 16, marginBottom: 5, textAlign: "center" },
  closeText: { fontSize: 16, color: "red", textAlign: "center", marginTop: 10 },
});

export default styles;
