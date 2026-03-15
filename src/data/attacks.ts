import type { Attack } from "../types/Attack";
import listaJson from "./attacks.json";

const attacks: Attack[] = structuredClone(listaJson) as Attack[]


export default attacks;