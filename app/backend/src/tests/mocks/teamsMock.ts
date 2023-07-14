type teamslistType = teamsType[];
type teamsType = {
  id: number,
  teamName: string,
}
const teamsList = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
]

export {
  teamsList,
  teamsType,
  teamslistType,
}