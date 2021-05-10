"""empty message

Revision ID: 685181fd0fe6
Revises: 
Create Date: 2021-05-10 15:06:35.367805

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '685181fd0fe6'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('buildingTypes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tagTypes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('profilePic', sa.String(length=255), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('postings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('city', sa.String(length=100), nullable=False),
    sa.Column('address', sa.String(length=250), nullable=False),
    sa.Column('buildingTypeId', sa.Integer(), nullable=False),
    sa.Column('numGuests', sa.Integer(), nullable=False),
    sa.Column('numBeds', sa.Integer(), nullable=False),
    sa.Column('numBathrooms', sa.Integer(), nullable=False),
    sa.Column('mainImageUrl', sa.String(length=250), nullable=True),
    sa.Column('description', sa.String(length=500), nullable=False),
    sa.Column('title', sa.String(length=250), nullable=False),
    sa.Column('price', sa.Integer(), nullable=False),
    sa.Column('latitude', sa.Float(), nullable=False),
    sa.Column('longitude', sa.Float(), nullable=False),
    sa.ForeignKeyConstraint(['buildingTypeId'], ['buildingTypes.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bookings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('postingId', sa.Integer(), nullable=False),
    sa.Column('date', sa.String(length=20), nullable=False),
    sa.ForeignKeyConstraint(['postingId'], ['postings.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('postingId', sa.Integer(), nullable=False),
    sa.Column('imageUrl', sa.String(length=250), nullable=False),
    sa.ForeignKeyConstraint(['postingId'], ['postings.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('postingReviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('postingId', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('review', sa.String(length=500), nullable=True),
    sa.ForeignKeyConstraint(['postingId'], ['postings.id'], ),
    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('postingId', sa.Integer(), nullable=False),
    sa.Column('tagTypeId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['postingId'], ['postings.id'], ),
    sa.ForeignKeyConstraint(['tagTypeId'], ['tagTypes.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tags')
    op.drop_table('postingReviews')
    op.drop_table('images')
    op.drop_table('bookings')
    op.drop_table('postings')
    op.drop_table('users')
    op.drop_table('tagTypes')
    op.drop_table('buildingTypes')
    # ### end Alembic commands ###