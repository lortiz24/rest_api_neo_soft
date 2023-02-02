
import { BadRequestException, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
export class HelperServices {
    private readonly logger;
    constructor(placeError: string) {
        this.logger = new Logger(placeError);
    }
    handleDbExceptions(error: any) {
        this.logger.error(`${error} - ${error.code}`)
        if (error.code === '23505')
            throw new BadRequestException(error.detail);
        if (error.status == '404')
            throw new NotFoundException(error.detail);
        if (error.code == '23503')
            throw new NotFoundException(error.detail);
        if (error.code == 'error-001') {
            throw new BadRequestException(error.detail.replace('Key ', ''));
        }
        throw new InternalServerErrorException('Inexpected error, check server logs')
    }
}