# Team


## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**school** | **str** |  | 
**mascot** | **str** |  | 
**abbreviation** | **str** |  | 
**alternate_names** | **List[str]** |  | 
**conference** | **str** |  | 
**division** | **str** |  | 
**classification** | **str** |  | 
**color** | **str** |  | 
**alternate_color** | **str** |  | 
**logos** | **List[str]** |  | 
**twitter** | **str** |  | 
**location** | [**Venue**](Venue.md) |  | 

## Example

```python
from cfbd.models.team import Team

# TODO update the JSON string below
json = "{}"
# create an instance of Team from a JSON string
team_instance = Team.from_json(json)
# print the JSON string representation of the object
print Team.to_json()

# convert the object into a dict
team_dict = team_instance.to_dict()
# create an instance of Team from a dict
team_from_dict = Team.from_dict(team_dict)
