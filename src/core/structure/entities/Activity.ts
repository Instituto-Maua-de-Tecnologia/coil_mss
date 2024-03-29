import { User } from "./User";
import { Course } from "./Course";
import { Criteria } from "./Criteria";
import { Institution } from "./Institution";
import { EntityError } from "../../helpers/errors/EntityError";
import { ActivityTypeEnum } from "../../helpers/enums/ActivityTypeEnum";
import { ActivityStatusEnum } from "../../helpers/enums/ActivityStatusEnum";

class ActivityProps {
    id: string;
    title: string;
    start_date: Date;
    end_date: Date;
    description: string;
    languages: string[] | [];
    partner_institutions: Institution[] | [];
    criterias: Criteria[];
    status_activity: ActivityStatusEnum;
    type_activity: ActivityTypeEnum;
    created_at: Date;
    updated_at: Date;
    applicants: {user: User, status: boolean}[] | [];
    courses: Course[] | [];
}

export class Activity {
    id: string;
    title: string;
    start_date: Date;
    end_date: Date;
    description: string;
    languages: string[] | [];
    partner_institutions: Institution[] | [];
    criterias: Criteria[] | [];
    status_activity: ActivityStatusEnum;
    type_activity: ActivityTypeEnum;
    created_at: Date;
    updated_at: Date;
    applicants: {user: User, status: boolean}[] | [];
    courses: Course[] | [];

    constructor(props: ActivityProps) {
        this.id = this.validate_set_id(props.id);
        this.title = this.validate_set_title(props.title);
        this.start_date = this.validate_set_start_date(props.start_date);
        this.end_date = this.validate_set_end_date(props.end_date);
        this.description = this.validate_set_description(props.description);
        this.languages = this.validate_set_languages(props.languages);
        this.partner_institutions = this.validate_set_partner_institutions(props.partner_institutions);
        this.criterias = this.validate_set_criterias(props.criterias);
        this.status_activity = this.validate_set_status_activity(props.status_activity);
        this.type_activity = this.validate_set_type_activity(props.type_activity);
        this.created_at = this.validate_set_created_at(props.created_at);
        this.updated_at = this.validate_set_updated_at(props.updated_at);
        this.applicants = this.validate_set_applicants(props.applicants);
        this.courses = this.validate_set_courses(props.courses);
    }

    public to_json(): {[key: string]: any}{
        return {
            id: this.id,
            title: this.title,
            start_date: this.start_date,
            end_date: this.end_date,
            description: this.description,
            languages: this.languages,
            partner_institutions: this.partner_institutions,
            criterias: this.criterias,
            status_activity: this.status_activity,
            type_activity: this.type_activity,
            created_at: this.created_at,
            updated_at: this.updated_at,
            applicants: this.applicants.map((applicant: {user: User, status: boolean}) => {return {user: applicant.user.to_json(), status: applicant.status}}),
            courses: this.courses.map((course: Course) => course.to_json())
        };
    }

    private validate_set_id(id: string) {
        if (id == null) {
            throw new EntityError("Parameter id is required");
        }
        if (typeof id !== "string") {
            throw new EntityError("Parameter id must be a string");
        }
        if (id.length !== 36) {
            throw new EntityError("Parameter id must be a valid UUID string");
        }
        return id;
    }

    private validate_set_title(title: string) {
        if (title == null || title.trim() === "") {
            throw new EntityError("Parameter title is required");
        }
        return title;
    }

    private validate_set_start_date(start_date: Date) {
        if (start_date == null) {
            throw new EntityError("Parameter start_date is required");
        }
        if (!(start_date instanceof Date)) {
            throw new EntityError("Parameter start_date must be a Date object");
        }
        if (start_date < new Date()) {
            throw new EntityError("Parameter start_date must be a date in the future");
        }
        return start_date;
    }

    private validate_set_end_date(end_date: Date) {
        if (end_date == null) {
            throw new EntityError("Parameter end_date is required");
        }
        if (!(end_date instanceof Date)) {
            throw new EntityError("Parameter end_date must be a Date object");
        }
        if (end_date < this.start_date) {
            throw new EntityError("Parameter end_date must be greater than start_date");
        }
        return end_date;
    }

    private validate_set_description(description: string) {
        if (description == null || description.trim() === "") {
            throw new EntityError("Parameter description is required");
        }
        return description;
    }

    private validate_set_languages(languages: string[] | []) {
        if (languages == null || languages.length === 0) {
            return [];
        }
        if (!Array.isArray(languages)) {
            throw new EntityError("Parameter languages is not an array");
        }
        if (languages.some((language) => typeof language !== "string")) {
            throw new EntityError("Parameter languages must be an array of strings");
        }
        return languages;
    }

    private validate_set_partner_institutions(partner_institutions: Institution[] | []) {
        if (partner_institutions == null || partner_institutions.length === 0) {
            return [];
        }
        if (!Array.isArray(partner_institutions)) {
            throw new EntityError("Parameter partner_institutions is not an array");
        }
        if (partner_institutions.some((institution) => !(institution instanceof Institution))) {
            throw new EntityError("Parameter partner_institutions must be an array of Institution objects");
        }
        return partner_institutions;
    }

    private validate_set_criterias(criterias: Criteria[] | []) {
        if (criterias == null || criterias.length === 0) {
            return [];
        }
        if (!Array.isArray(criterias)) {
            throw new EntityError("Parameter criterias is not an array");
        }
        if (criterias.some((criteria) => !(criteria instanceof Criteria))) {
            throw new EntityError("Parameter criterias must be an array of Criteria objects");
        }
        return criterias;
    }

    private validate_set_status_activity(status_activity: ActivityStatusEnum) {
        if (status_activity == null) {
            throw new EntityError("Parameter status_activity is required");
        }
        if (!(status_activity in ActivityStatusEnum)) {
            throw new EntityError("Parameter status_activity is not a valid ActivityStatusEnum value");
        }
        return status_activity;
    }

    private validate_set_type_activity(type_activity: ActivityTypeEnum) {
        if (type_activity == null) {
            throw new EntityError("Parameter type_activity is required");
        }
        if (!(type_activity in ActivityTypeEnum)) {
            throw new EntityError("Parameter type_activity is not a valid ActivityTypeEnum value");
        }
        return type_activity;
    }

    private validate_set_created_at(created_at: Date) {
        if (created_at == null) {
            throw new EntityError("Parameter created_at is required");
        }
        if (!(created_at instanceof Date)) {
            throw new EntityError("Parameter created_at must be a Date object");
        }
        if (created_at > new Date()) {
            throw new EntityError("Parameter created_at must be a date in the past");
        }
        return created_at;
    }

    private validate_set_updated_at(updated_at: Date) {
        if (updated_at == null) {
            throw new EntityError("Parameter updated_at is required");
        }
        if (!(updated_at instanceof Date)) {
            throw new EntityError("Parameter updated_at must be a Date object");
        }
        if (updated_at < this.created_at) {
            throw new EntityError("Parameter updated_at must be greater than created_at");
        }
        return updated_at;
    }

    private validate_set_applicants(applicants: {user: User, status: boolean}[] | []) {
        if (applicants == null || applicants.length === 0) {
            return [];
        }
        if (!Array.isArray(applicants)) {
            throw new EntityError("Parameter applicants is not an array");
        }
        if (applicants.some((applicant) => !(applicant.user instanceof User) || typeof applicant.status !== "boolean")) {
            throw new EntityError("Parameter applicants must be an array of objects with user as User and status as boolean");
        }
        return applicants;
    }

    private validate_set_courses(courses: Course[] | []) {
        if (courses == null || courses.length === 0) {
            return [];
        }
        if (!Array.isArray(courses)) {
            throw new EntityError("Parameter courses is not an array");
        }
        if (courses.some((course) => !(course instanceof Course))) {
            throw new EntityError("Parameter courses must be an array of Course objects");
        }
        return courses;
    }
}