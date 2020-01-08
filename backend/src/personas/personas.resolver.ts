import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PersonasService } from './personas.service';
import { PersonaType } from './dto/create-persona.dto';
import { PersonaInput } from './input-personas.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gqlauth.guard';

@Resolver('Personas')
export class PersonasResolver {
  constructor(private readonly personasService: PersonasService) {}

  @Query(() => [PersonaType])
  @UseGuards(new GqlAuthGuard('jwt'))
  async personas() {
    return this.personasService.findAll();
  }

  @Query(() => PersonaType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async personaById(@Args('id') id: string) {
    return this.personasService.findOne(id);
  }

  @Mutation(() => PersonaType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async createPersona(@Args('input') input: PersonaInput) {
    return this.personasService.create(input);
  }

  @Mutation(() => PersonaType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async updatePersona(
    @Args('id') id: string,
    @Args('input') input: PersonaInput,
  ) {
    return this.personasService.update(id, input);
  }

  @Mutation(() => PersonaType)
  @UseGuards(new GqlAuthGuard('jwt'))
  async deletePersona(@Args('id') id: string) {
    return this.personasService.delete(id);
  }

  @Query(() => String)
  async hello() {
    return 'hello';
  }
}
