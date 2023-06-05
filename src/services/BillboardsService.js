import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class BillboardsService {
  async getBillboards() {
    const res = await api.get('api/ads')
    AppState.billboards = res.data
  }
}

export const billboardsService = new BillboardsService()