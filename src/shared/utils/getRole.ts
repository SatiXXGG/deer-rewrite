import { Roles } from "shared/types/RoleTags";

export default function getRole(instance: Instance): Roles {
	if (instance.GetTags().includes(Roles.wendigo)) return Roles.wendigo;
	if (instance.GetTags().includes(Roles.deer)) return Roles.deer;
	if (instance.GetTags().includes(Roles.hunter)) return Roles.hunter;

	return Roles.none;
}
