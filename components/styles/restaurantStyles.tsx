import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  inputContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  input: { flex: 1, borderWidth: 1, padding: 10, borderRadius: 5, marginRight: 10 },
  item: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 12, borderBottomWidth: 1 },
  text: { fontSize: 16 },
  buttons: { flexDirection: "row" },
  edit: { color: "blue", marginRight: 15 },
  delete: { color: "red" },
});
