"""minor changes to get ready for maps

Revision ID: d37678ce7077
Revises: 5abbf091f559
Create Date: 2021-05-05 18:08:24.993760

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd37678ce7077'
down_revision = '5abbf091f559'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('postings', sa.Column('latitude', sa.Float(), nullable=False))
    op.add_column('postings', sa.Column('longitude', sa.Float(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('postings', 'longitude')
    op.drop_column('postings', 'latitude')
    # ### end Alembic commands ###
