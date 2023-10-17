import { ContextType } from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';

export const GRAPHQL_CONTEXT: GqlContextType = 'graphql';
export const HTTP_CONTEXT: ContextType = 'http';
