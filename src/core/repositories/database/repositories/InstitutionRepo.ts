import { PrismaClient } from "@prisma/client";

import { DatabaseMain } from "../DatabaseMain";
import { InstitutionDTO } from "../dtos/InstitutionDTO";
import { IInstitutionRepo } from "../../interfaces/IInstitutionRepo";
import { Institution } from "../../../structure/entities/Institution";

export class InstitutionRepo implements IInstitutionRepo {
    private client: PrismaClient;
    private institution_dto: InstitutionDTO = new InstitutionDTO();
  
    constructor() {
      this.client = new DatabaseMain().rd_client;
    }

    public async get_all_institutions(): Promise<Institution[]> {
        let institutions_found = await this.client.institution.findMany();
        return institutions_found.map(institution => this.institution_dto.to_entity(institution));
    }

    public async create_institution(institution: Institution): Promise<boolean> {
        let institution_to_create = this.institution_dto.to_database(institution);
        
        await this.client.institution.create({
            data: {
                ...institution_to_create,
                social_medias: {
                    create: institution_to_create.social_medias,
                },
                images: {
                    create: institution_to_create.images
                }
            },
            include: {
                images: true,
                social_medias: true,
            },
        }).then(() => {
            this.client.$disconnect();
            return true;
        }).catch(() => {
            this.client.$disconnect();
            return false;
        });

        this.client.$disconnect();
        return false;
    }

    public async update_institution(institution: Institution): Promise<Institution> {
        let institution_to_update = this.institution_dto.to_database(institution);
        
        await this.client.institution.update({
            where: {
                id: institution.id,
            },
            data: {
                ...institution_to_update,
                social_medias: {
                    create: institution_to_update.social_medias,
                },
                images: {
                    create: institution_to_update.images
                }
            },
            include: {
                images: true,
                social_medias: true,
            },
        });

        this.client.$disconnect();
        return institution;
    }

    public async delete_institution(id: string): Promise<boolean> {
        await this.client.institution.delete({
            where: {
                id: id,
            },
        });

        this.client.$disconnect();
        return true;
    }

    public async get_institution(id: string): Promise<Institution | null> {
        let institution_found = await this.client.institution.findUnique({
            where: {
                id: id,
            },
            include: {
                images: true,
                social_medias: true,
            },
        });

        this.client.$disconnect();
        if (!institution_found) {
            return null;
        }

        return this.institution_dto.to_entity(institution_found);
    }
}