import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, paddingVertical: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15, textAlign: "center" },

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
  filterButton: { paddingVertical: 8, paddingHorizontal: 14, marginRight: 6, borderRadius: 12, backgroundColor: "#eee", minWidth: 90, alignItems: "center" },
  selectedButton: { backgroundColor: "#ff6347" },
  filterText: { fontSize: 14, color: "#333", textAlign: "center" },
  selectedText: { color: "#fff", fontWeight: "bold" },

  addButton: { backgroundColor: "#28A745", padding: 10, alignItems: "center", borderRadius: 5, marginBottom: 10 },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  saveButton: { backgroundColor: "#FFC107", padding: 10, alignItems: "center", borderRadius: 5, marginBottom: 10 },
  saveButtonText: { color: "#fff", fontWeight: "bold" },

  menuList: { paddingHorizontal: 10, paddingTop: 10 },
  item: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  name: { fontSize: 18, fontWeight: "600" },
  category: { fontSize: 12, color: "#555" },
  buttonGroup: { flexDirection: "row" },
  editButton: { backgroundColor: "#FFC107", padding: 5, borderRadius: 5, marginHorizontal: 5 },
  deleteButton: { backgroundColor: "#DC3545", padding: 5, borderRadius: 5 },
  buttonText: { color: "#fff" },
});
