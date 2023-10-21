import { generateId } from 'src/common/functions/generate-id.util';
import { FilterInput } from 'src/common/graphql';

export class CommonServiceTests {
  public readonly entityService;
  public readonly entityRepository;

  constructor(_entityService, _entityRepository) {
    this.entityService = _entityService;
    this.entityRepository = _entityRepository;
  }

  public async getOneEntity() {
    const id = generateId();

    await this.entityService.getOneEntity({ id });

    expect(this.entityRepository.getOneEntity).toHaveBeenCalled();
    expect(this.entityRepository.getOneEntity).toHaveBeenCalledWith({
      id,
    });
  }

  public async getEntities(filterInput: FilterInput = {}) {
    await this.entityService.getEntities(filterInput);

    expect(this.entityRepository.getAllEntities).toHaveBeenCalled();
  }

  public async createEntity(input) {
    await this.entityService.createEntity(input);

    expect(this.entityRepository.createEntity).toHaveBeenCalled();
    expect(this.entityRepository.createEntity).toHaveBeenCalledWith(input);
  }

  public async updateEntity(payload) {
    // Arrange
    const id = generateId();
    const updateEntityInput = {
      where: { id },
      data: payload,
    };

    // Act
    await this.entityService.updateEntity(updateEntityInput);

    // Assert
    expect(this.entityRepository.updateEntity).toHaveBeenCalled();
    expect(this.entityRepository.updateEntity).toHaveBeenCalledWith(
      updateEntityInput,
    );
  }

  public async deleteEntity() {
    const id = generateId();

    await this.entityService.deleteEntity({
      id,
    });

    expect(this.entityRepository.deleteEntity).toHaveBeenCalled();
    expect(this.entityRepository.deleteEntity).toHaveBeenCalledWith({
      id,
    });
  }
}
