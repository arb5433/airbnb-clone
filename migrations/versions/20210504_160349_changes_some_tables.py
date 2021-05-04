"""changes some tables

Revision ID: 9dce71575eb3
Revises: ca9bfd9b8bc7
Create Date: 2021-05-04 16:03:49.086842

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9dce71575eb3'
down_revision = 'ca9bfd9b8bc7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('bookings', sa.Column('date', sa.Date(), nullable=False))
    op.add_column('postings', sa.Column('buildingTypeId', sa.Integer(), nullable=False))
    op.drop_constraint('postings_buildingType_fkey', 'postings', type_='foreignkey')
    op.create_foreign_key(None, 'postings', 'buildingTypes', ['buildingTypeId'], ['id'])
    op.drop_column('postings', 'buildingType')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('postings', sa.Column('buildingType', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'postings', type_='foreignkey')
    op.create_foreign_key('postings_buildingType_fkey', 'postings', 'buildingTypes', ['buildingType'], ['id'])
    op.drop_column('postings', 'buildingTypeId')
    op.drop_column('bookings', 'date')
    # ### end Alembic commands ###
